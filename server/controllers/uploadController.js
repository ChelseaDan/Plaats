//need to export the api methods.
var mongoose = require('mongoose');
var sizeOf = require('image-size');
var Image = require('../models/images');
var fs = require('fs');
var path = require('path');
var resemble = require('node-resemble-js');

module.exports.upload = function (req, res, next) {
    if (!req.file.mimetype.startsWith('image/')) {
        return res.status(422).json({
            error: 'The uploaded file must be an image'
        });
    }

    var dimensions = sizeOf(req.file.path);

    /*if ((dimensions.width < 640) || (dimensions.height < 480)) {
        return res.status(422).json({
            error: 'The image must be at least 640 x 480px'
        });
    }*/

    var image = new Image({ email: "ABC123", imagePath: req.file.path });
    image.save();

    return res.status(200).send(req.file);
    /*fs.readdir(path.join(__dirname, './../../uploads'), function (err, files) {
        if (err) {
            return console.error(err);
        }

        var filesToReturn = [];

        // files.forEach(function (file) {
        //     var diff = resemble(path.join(__dirname, './../../uploads/' + file)).compareTo(path.join(__dirname, './../../uploads/' + req.file.filename)).ignoreColors().onComplete(function(data){
        //         console.log(data.misMatchPercentage);
        //     });
        // });
    });

    return res.status(200).send(req.file);*/
}
