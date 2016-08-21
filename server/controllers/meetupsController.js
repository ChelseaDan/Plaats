//need to export the api methods.
var Meetup = require('../models/meetup');

module.exports.create = function(req, res) {
    var meetup = new Meetup(req.body);
    meetup.save(function(err, result){
        res.json(result);
    });
}

module.exports.list = function(req, res) {
    Meetup.find({}, function(err, results){
        res.json(results);
    });
}

module.exports.remove = function(req, res, next) {
    Meetup.remove({name: req.params.name}, function(err, results){
        res.json(results);
    });
}