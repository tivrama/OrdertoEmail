var path = require('path');
var request = require('request');
var keys = require('./config/config.js');
var emailNames = require('./config/emailNames.js');
var helper = require('./js/helpfunctions.js');



    module.exports = function(app) {



        app.get('/api/test', function(req, res) {
            console.log('INSIDE GET!!!');
            var test = "Hello from inside /api/test - GET";
                res.send(test);
        });



        // Call to get order info and return alerts type codes and names
        app.post('/api/getorder', function(req, res) {

            // base 46 encode logon and password
            var auth = new Buffer(req.body.logon + ":" + req.body.password).toString('base64');
            var url = "https://ws.narvar.com/api/v1/orders/" + req.body.order

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
                    body.emailTypes = emailNames[req.body.retailer];
                    res.json(body);
                }
            });
        });




        // Call to get order info and return alerts type codes and names
        app.post('/api/sendemail', function(req, res) {

            var url = "https://template-processor-qa01.narvar.qa/templateprocessor/"+ req.body.retailer + "/templates/" + req.body.alertEmailType + "/generate";

            // Call function to json, and format into post body for template processor
            var payload = helper.makeTempProcessorPayload(req.body.OrderAPIJSON, req.retailer)

            // Post to template processor


            // Call function to take template processor response, email/names and format into Sparkpost Post

            // Post to Sparkpost

            // Send success to client

        });


        // frontend routes =========================================================
        // route to handle all requests
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../client', 'index.html'));
        });

    };