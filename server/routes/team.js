var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    var player = req.body;
    console.log(player);

    res.send("we got the player!");
});



module.exports = router;