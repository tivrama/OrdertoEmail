 // app/routes.js
var request = require('request');
var keys = require('./config.js');
var emailTypes = require('./emailCodes.js');

    module.exports = function(app) {

        app.get('/api/test', function(req, res) {
            console.log('INSIDE GET!!!');
            var test = "Hello!!!";
                res.send(test);
                // res.json(res);
        });


        // Call to get order info and return alerts type codes and names
        app.post('/api/getorder', function(req, res) {

            console.log('INSIDE POST: ', req.body);

            // base 46 encode logon and password
            var auth = new Buffer(req.body.logon + ":" + req.body.password).toString('base64');
            var url = "https://ws.narvar.com/api/vi/orders/" + req.body.order

            request.get({
                headers: { Authorization: auth },
                url: url
            }, function(error, response, body) {
                if (error) {
                    console.log('Call to the Order API failed', error);
                    res.send(error);
                } else {
                    // add Alert types to the body
                    console.log('retailer: ', emailTypes[req.body.retailer]);

                    body.emails = emailTypes[req.body.retailer];
                    console.log('BODY!!!!: ', body.data.emails);
                    res.send(body);
                }
            });
        });


        // frontend routes =========================================================
        // route to handle all requests
        app.get('*', function(req, res) {
            res.sendfile('index.html'); // load index.html file
        });

    };



/*
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://localhost/test2.php',
  body:    "mes=heydude"
}, function(error, response, body){
  console.log(body);
});
*/