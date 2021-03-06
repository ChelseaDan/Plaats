// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        firstname    : String,
        lastname     : String, 
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
