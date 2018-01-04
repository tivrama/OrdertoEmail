 // app/routes.js
var request = require('request');


    module.exports = function(app) {

        app.get('/api/test', function(req, res) {
            console.log('INSIDE GET!!!');
            var test = "Hello!!!";
                res.send(test);
                // res.json(res);
        });


        // Call to get order info and return alerts type codes and names
        app.post('/api/getorder', function(req, res) {
            console.log('INSIDE POST');
            //get query from req
            var query = req.body.word;
            // make the request of reddit
            request("http://tracking.narvar.com/trackinginfo/bathandbodyworks/narvar-speedee?tracking_numbers=1Z8R904Y1305724427", function(error, response, body) {
                if (error) {
                  console.log('Call to the Order API failed', error);
                  res.send(error);
                } else {
                  //send off the results
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

{
    "hello":"World"
}
*/