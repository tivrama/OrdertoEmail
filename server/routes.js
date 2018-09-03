var path = require('path');
var request = require('request');
var keys = process.env.SPARK_POST_KEY || require('./config/config.js').sparkpost;
var emailNames = require('./config/emailNames.js');
var helper = require('./js/helpfunctions.js');
var fakeOrder = require('./config/order.js');


    module.exports = function(app) {



        app.get('/api/test', function(req, res) {
            console.log('INSIDE GET!!!');
            var test = "Hello from inside /api/test - GET";
                res.send(test);
        });




        // Call to get order info and returna transformed payload which works in Hub Templates GUI
        app.post('/api/getpayload', function(req, res) {

            
            var retailer = "";
            if (!req.body.retailer) {
                retailer = "peninsula"
            } else {
                retailer = req.body.retailer.toLowerCase();
            }


            // base 46 encode logon and password
            var auth = new Buffer(req.body.logon + ":" + req.body.password).toString('base64');
            // Point the url to the correct environment
            var url = "";
            var env = "";
            if (!req.body.environment) {
                env = "production"
            } else {
                env = req.body.environment.toLowerCase();
            }

            if (env === "qa") {
                url = "https://ws.narvar.qa/api/v1/orders/" + req.body.order
            } else {
                url = "https://ws.narvar.com/api/v1/orders/" + req.body.order
            }



            request.get({
                headers: { Authorization: "Basic " + auth },
                url: url
            }, function(error, response, body) {
                if (error) {
                    console.log('Call to the Order API failed', error);
                    res.send(error);
                } else {

                    // Call functions to transform the payload
                    body = JSON.parse(body);

                    // Call function to json, and format into post body for template processor
                    var templatePayload = helper.MakeTempProcessorPayload(body, retailer);


                    if (!templatePayload.order_info.current_shipment) {
                            console.log('No items shipped, so no dice', templatePayload);
                            res.send("Looks like nothing has shipped on this order... sorry...");
                    }

                    // Send modified payload (body)
                    res.json(templatePayload);
                }
            });
        });










        // Call to get order info and return alerts type codes and names
        app.post('/api/getorder', function(req, res) {

            // base 46 encode logon and password
            var auth = new Buffer(req.body.logon + ":" + req.body.password).toString('base64');

            if (req.body.env === "qa") {
                var url = "https://ws.narvar.qa/api/v1/orders/" + req.body.order
            } else {
                var url = "https://ws.narvar.com/api/v1/orders/" + req.body.order
            }


            request.get({
                headers: { Authorization: "Basic " + auth },
                url: url
            }, function(error, response, body) {
                if (error) {
                    console.log('Call to the Order API failed', error);
                    res.send(error);
                  
                } else {
                    // add Alert types to the body
                    body = JSON.parse(body);

                    if (body.status === "ERROR") {
                        body.status = "SUCCESS";
                        body.order_info = fakeOrder;
                    }

                    body.emailTypes = emailNames[req.body.retailer];
                    res.json(body);
                }
            });
        });




        // Call to get order info and return alerts type codes and names
        app.post('/api/sendemail', function(req, res) {

            var templateUrl = "https://template-processor-qa01.narvar.qa/templateprocessor/"+ req.body.retailer + "/templates/" + req.body.alertEmailType + "/generate";
            var sparkpostUrl = "https://api.sparkpost.com/api/v1/transmissions";

            // Call function to json, and format into post body for template processor
            var templatePayload = helper.MakeTempProcessorPayload(req.body.OrderAPIJSON, req.body.retailer);
            var sparkpostPayload;
// console.log("TMPLATE: ", templatePayload)

            if (templatePayload === false) {
                console.log('No items shipped, so no dice', templatePayload);
                res.send("Looks like nothing has shipped on this order... sorry...");
            }


            // Post to template processor
            request.post({
                headers: { "Content-Type" : "application/json" },
                url: templateUrl,
                body: JSON.stringify(templatePayload)
            }, function(error, response, body) {
                if (error) {
                    console.log('Call to the Template Processor failed', error);
                    res.send(error);
                
                } else {
                // Call function to take template processor response, email/names and format into Sparkpost Post
                    sparkpostPayload = helper.MakeSparkpostPayload(response.body, req.body.retailer, req.body.recipients);
                    // Post payload to Sparkpost
                    request.post({
                        headers: {
                            "Authorization" : "Basic " + keys,
                            "Content-Type" : "application/json",
                            "Accept": "text/csv",
                        },
                        url: sparkpostUrl,
                        body: JSON.stringify(sparkpostPayload)
                    }, function (err, resp, spbody) {
                        if (err) {
                            console.log('Call to Sparkpost failed', error);
                            res.send(err);

                        } else {
                            // Send success to client
                            res.send(spbody);
                        }
                    });
                }
            });
        });


        // frontend routes =========================================================
        // route to handle all requests
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../client', 'index.html'));
        });

    };
