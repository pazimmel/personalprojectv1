var mongoose = require('mongoose');


// Mongo Connection //
var mongoURI = "mongodb://localhost:27017/team_manager";
//var mongoURI = "";

var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

module.exports.mongoDB = mongoDB;
module.exports.mongoURI = mongoURI;