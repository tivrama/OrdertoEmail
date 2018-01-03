// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
// configuration ===========================================


// set our port
var port = process.env.PORT || 3000; 


//----------------------------

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/')); 

// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:3000
app.listen(port);               

// App server confirmation                     
console.log('Email Generator app running on port: ' + port);

// expose app           
exports = module.exports = app; 