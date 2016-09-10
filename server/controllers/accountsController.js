//need to export the api methods.
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt   = require('bcrypt-nodejs');

module.exports.create = function(req, res) {
    var newUser = new User();
    newUser.local.firstname = req.body.firstName;                   
    newUser.local.lastname = req.body.lastName;
    newUser.local.email = req.body.emailAddress;    
    newUser.local.password = bcrypt.hashSync(req.body.password);
    newUser.save(function(err, result){
        var millisecondsToWait = 5000;
        setTimeout(function() {
        res.json(result);
        }, millisecondsToWait);
    });
};

module.exports.checkUser = function(req, res) {

}