var mongoose = require('mongoose');


// Mongo Connection //

var mongoURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017/team_manager" ;




//var mongoURI = "";

var mongoDB = mongoose.connect(mongoURI).connection;


mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
    console.log("connected to Mongo!");
});

module.exports.mongoDB = mongoDB;
module.exports.mongoURI = mongoURI;