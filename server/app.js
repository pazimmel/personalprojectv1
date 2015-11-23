var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
//var passport = require('./strategies/user');
//var session = require('express-session');

//var register = require('./routes/register');
//var user = require('./routes/user');
var index = require('./routes/index');
var test = require('./routes/test');
var sayHello = require('./module/testScheduler');
//var manager = require('/routes/manager');

// App Set //
app.set("port", (process.env.PORT || 5000));

console.log(sayHello());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

// Passport Session Configuration //
//app.use(session({
//    secret: 'secret',
//    key: 'user',
//    resave: 'true',
//    saveUninitialized: false,
//    cookie: {maxage: 600000, secure: false}
//}));

//app.use(passport.initialize());
//app.use(passport.session());

// Routes
//app.use('/register', register);
//app.use('/user', user);


app.use('/test', test);
app.use('/', index);

// Mongo Connection //
var mongoURI = "mongodb://localhost:27017/team_manager";
//var mongoURI = "";

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(){
    console.log("Connected to Mongo, yo!");
});

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
