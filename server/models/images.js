//Like a DTO.

var mongoose = require('mongoose');

module.exports = mongoose.model('Image', {
    email: String,
    imagePath: String
});