var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/usersDB';

mongoose.connect(dbURI);

var userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    age: { type: Number, required: false, min: 1, max: 100 },
    email: { type: String, required: false }

});

mongoose.model('user', userSchema, 'users');

mongoose.connection.on('connected', function() {
    console.log('Mongoose is connected to ' + dbURI);
});