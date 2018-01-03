 // app/routes.js
var request = require('request');
var key = 'process.env.WORDNIK_API_KEY';
// var express = require('express');

    module.exports = function(app) {

        app.get('/api/test', function(req, res) {
            console.log('INSIDE GET!!!');
            var test = "Hello!!!";
                res.send(test);
            
        });

        app.post('/api/checkWords', function(req, res) {
            console.log('Inside checkWords Post: ', req.body);
            //get query from req
            var query = req.body.word;
            // make the request of reddit
            request("http://api.wordnik.com:80/v4/word.json/" + query + "/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=1&api_key=" + key, function(error, response, body) {
                if (error) {
                  console.log('Something went wrong with wordnik', error);
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
