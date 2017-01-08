/*
 * This script runs on the public server, NOT
 * the one connected to the Arduino controller.
 * Use bridge.js for that.
 */

// Express is probably overkill for this, but it helps with serving files
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);


// Nunjucks makes getting the current pattern to the client easier
var nunjucks = require('nunjucks');
nunjucks.configure('views', {
	autoescape: true,
	express: app
});

// Static resource folder for assets
app.use(express.static('public'));


// Initialize the light pattern
var currentSignal = false;


// Express route that renders index.njk with the currently set light pattern
app.get('/', function(req, res){
	console.log('rendering with signal: '+currentSignal);
	res.render('index.njk', { currentSignal: currentSignal ? currentSignal.split('') : false });
});


// Socket.io connection setup
io.on('connection', function(socket){
	console.log('a user connected');

	// Set the given light pattern when a new signal is received
	socket.on('signal', function(signal) {
		console.log('you got a signal: '+signal);
		currentSignal = signal;

		// Emit the signal to all connected clients (including the arduino bridge script)
		io.emit('signal', signal);
	});
});


http.listen(3000, function(){
	console.log('listening on *:3000');
});