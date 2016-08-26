//Main entry point to node application
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean-demo');

meetupsController = require('./server/controllers/meetupsController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/index.html');
});

app.post('/api/meetups', meetupsController.create);

app.get('/api/meetups', meetupsController.list);

app.delete('/api/meetups/:name', meetupsController.remove);

app.use('/scripts', express.static(__dirname + '/client/scripts'));
app.use('/css', express.static(__dirname + '/client/css'));

app.listen(3000, function() {
    console.log('I\'m Listening...');
})