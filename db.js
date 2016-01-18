
var settings = require("./settings");
var mongoose = require('mongodb');

var dbUrl = 'mongodb://'+settings.details.ipAddress+':'+settings.details.port +'/'+ settings.details.dbName;

mongoose.connect(dbUrl, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + dbUrl);
    }
});
module.exports = mongoose.connection;