var express = require('express');
var router = express.Router();
var sayHello = require('../module/testScheduler');

router.get('/', function(req,res){
    var result = sayHello();
    res.send(result);
});

module.exports = router;