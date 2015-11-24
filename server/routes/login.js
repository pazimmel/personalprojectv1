var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var authObject = {};

var exportFunction = function(authObject){
   console.log("it's in loginCode ", authObject);
    return authObject;
};

router.post('/', function(req, res){
    var auth = req.query;
    console.log("object from the server, ",auth);
    authObject = exportFunction(auth);
    res.send("we got it!");
});




module.exports.authObject = authObject;
module.exports.router = router;