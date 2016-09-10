//Main entry point to node application
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/mean-demo');
mongoose.connect('mongodb://plaatsdb:plaats123@ds019996.mlab.com:19996/heroku_p81txdqj');


meetupsController = require('./server/controllers/meetupsController');
accountsController = require('./server/controllers/accountsController');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//UI - html routes.

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/views/index.html');
});

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/client/scripts/controllers/common/banner.html');
});

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/client/scripts/controllers/common/login.html');
});

app.get('/properties', function(req, res){
  res.sendFile(__dirname + '/client/scripts/controllers/home/home.html');
});

// Controller method routes.

app.post('/api/meetups', meetupsController.create);

app.post('/api/accounts/register', accountsController.create);

app.post('/api/accounts/login', accountsController.checkUser);

app.get('/api/meetups', meetupsController.list);

app.delete('/api/meetups/:name', meetupsController.remove);

//Static file serving.

app.use('/scripts', express.static(__dirname + '/client/scripts'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/dist', express.static(__dirname + '/dist/scripts'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));

app.listen(process.env.PORT || 3000, function() {
    console.log('I\'m Listening...');
})