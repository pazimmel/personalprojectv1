var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var authenticate = require('../module/authenticate');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;



router.post('/', function(req, res){
    var auth = req.query.code;
    authenticate(auth);

    res.send("we got it!");
});





module.exports = router;