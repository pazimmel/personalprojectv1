var mongoose = require('mongoose');


// Mongo Connection //
//|| "mongodb://localhost:27017/team_manager"
var mongoURI = process.env.MONGOLAB_URI ;




//var mongoURI = "";

var mongoDB = mongoose.connect(mongoURI).connection;


mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
    console.log("connected to Mongo!");
});

module.exports.mongoDB = mongoDB;
module.exports.mongoURI = mongoURI;