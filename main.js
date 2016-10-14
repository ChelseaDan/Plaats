//Main entry point to node application
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var crypto = require('crypto');
var multer = require('multer');
var io = require('socket.io')(http);
var mime = require('mime');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload   =  multer( { storage: storage } );
var mongoose = require('mongoose');
var passport = require('passport');

//mongoose.connect('mongodb://localhost:27017/mean-demo');
mongoose.connect('mongodb://plaatsdb:plaats123@ds019996.mlab.com:19996/heroku_p81txdqj');


meetupsController = require('./server/controllers/meetupsController');
accountsController = require('./server/controllers/accountsController');
uploadController = require('./server/controllers/uploadController');
require('./server/config/passport')(passport); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));   

	// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Controller method routes.

app.post('/api/meetups', meetupsController.create);

app.post('/api/accounts/register', accountsController.create);

app.post('/api/accounts/login', accountsController.checkUser);

app.get('/api/meetups', meetupsController.list);

app.delete('/api/meetups/:name', meetupsController.remove);

app.post('/api/upload', upload.single( 'file' ), uploadController.upload);

//Static file serving.

app.use('/scripts', express.static(__dirname + '/client/scripts'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/dist', express.static(__dirname + '/dist/scripts'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/TestImages/', express.static(__dirname + '/TestImages/'));

// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/client/views/index.html');
	});

    app.get('/home', function(req, res){
        res.sendFile(__dirname + '/client/scripts/controllers/home/home.html');
    });

	app.get('/gallery', function(req, res){
        res.sendFile(__dirname + '/client/scripts/controllers/gallery/gallery.html');
    });

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.sendFile(__dirname + '/client/scripts/controllers/common/login.html');
	});

	app.get('/account', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.sendFile(__dirname + '/client/scripts/controllers/account/account.html');
	});

	app.get('/search', function(req, res) {
		res.sendFile(__dirname + '/client/scripts/controllers/search/search.html');
	})

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.sendFile(__dirname + '/client/scripts/controllers/common/login.html');
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
        res.sendFile(__dirname + '/client/scripts/controllers/home/home.html');
	});

    app.get('/properties', function(req, res){
        res.sendFile(__dirname + '/client/scripts/controllers/home/home.html');
    });

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

app.listen(process.env.PORT || 3000, function() {
    console.log('I\'m Listening on port...' + (process.env.PORT || 3000));
})