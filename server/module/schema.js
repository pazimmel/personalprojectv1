var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.model('Player', new Schema({"name": String, "email": String, "type": String}, {collection: 'roster'}, {autoIndex: false}));
var Player = mongoose.model('Player');

mongoose.model('Calendar', new Schema({"name": String, "summary": String, "id": String}, {collection:'calendar'}, {autoIndex: false}));
var Calendar = mongoose.model('Calendar');

mongoose.model('Reminder', new Schema({"first_reminder": Number, "second_reminder": Number, "attendance_reminder": Number, "calendarId": String},
    {collection: "reminder"}, {autoIndex: false}));
var Reminder = mongoose.model('Reminder');

mongoose.model('AuthTokens', new Schema({"access_token": String, "refresh_token": String, "id_token": String}, {collection: 'authtokens'}, {autoIndex: false}));
var AuthTokens = mongoose.model('AuthTokens');

module.exports.player = Player;
module.exports.calendar = Calendar;
module.exports.authtokens = AuthTokens;
module.exports.reminder = Reminder;