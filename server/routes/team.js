var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.model('Player', new Schema({"name": String, "email": String, "type": String}, {collection: 'roster'}, {autoIndex: false}));
var Player = mongoose.model('Player');


router.post('/', function(req, res){
    var player = req.body;
    console.log(player);
    player = new Player({name: player.name, email: player.email, type: player.type});
    player.save(function(err, data){
        if (err) console.log("Error ", err);
        res.send(data);
    });

});



module.exports = router;