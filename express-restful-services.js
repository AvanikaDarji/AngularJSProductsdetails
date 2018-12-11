var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// add public folder path
var path = require("path");
var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

require('./db.js');

var USERS = mongoose.model('user');
app.use(bodyParser.json());



app.get('/users', function(req, res) {
    USERS.find({}, function(error, users) {
        res.send(users);
    });
});


app.post('/users', function(req, res) {
    var user = req.body;
    USERS.create(user, function(err, newUser) {
        if (err) {
            res.sendCode(500);
        }

        res.sendStatus(201);
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});