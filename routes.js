var request = require('request');
var keys = require('./config.js');
var emailTypes = require('./emailCodes.js');

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
                    body.emailTypes = emailTypes[req.body.retailer];
                    res.json(body);
                }
            });
        });


        // frontend routes =========================================================
        // route to handle all requests
        app.get('*', function(req, res) {
            res.sendfile('index.html'); // load index.html file
        });

    };
