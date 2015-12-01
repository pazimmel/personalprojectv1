var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = require('../module/schema');


mongoose.model('Player', new Schema({"name": String, "email": String, "type": String}, {collection: 'roster'}, {autoIndex: false}));
var Player = mongoose.model('Player');

mongoose.model('Calendar', new Schema({"name": String, "summary": String, "id": String}, {collection:'calendar'}, {autoIndex: false}));
var Calendar = mongoose.model('Calendar');

mongoose.model('Reminder', new Schema({"first_reminder": Number, "second_reminder": Number, "attendance_reminder": Number, "calendarId": String},
    {collection: "reminder"}, {autoIndex: false}));
var Reminder = mongoose.model('Reminder');

router.route('/roster')
    .post(function(req, res){
        var player = req.body;
        console.log(player);
        player = new Player({name: player.name, email: player.email, type: player.type});
        player.save(function(err, data){
            if (err) console.log("Error ", err);
            res.send(data);
        });
    })
    .get(function(req,res){
    Player.find({}, function(err, data){
        if (err) console.log("Error: ", err);
        res.send(data);
    });
});

router.route('/delete')
    .post(function(req,res){
       var playerId = req.body._id;
        console.log(playerId);
        Player.findByIdAndRemove(playerId, function(err,data){
           if (err) return err;
            res.send(data);
        });

    });
router.route('/calendar')
    .post(function(req,res){
        var calendar = req.body;
        console.log(calendar);
        calendar = new Calendar({summary: calendar.summary, id: calendar.id});
        calendar.save(function(err, data){
            if (err) console.log("Error ", err);
            res.send(data);
        });
    })
    .get(function(req,res){
        var calendars;
        Calendar.find({}, function(err,data){
            if (err) console.log("Error: ", err);
            res.send(data);
        });
    });
router.route('/reminder')
    .post(function(req,res){
        var reminder = req.body;
        reminder = new Reminder({first_reminder: reminder.first_reminder, second_reminder: reminder.second_reminder, attendance_reminder: reminder.attendance_reminder, calendarId: reminder.calendarId});
        reminder.save(function(err,data){
            if(err) console.log("Error ", err);
            res.send(data);
        });

    });
module.exports = router;