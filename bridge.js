/*
 * After connecting your Arduino controller,
 * run this Node script on the computer connected to it
 */

var io = require('socket.io-client');
var five = require("johnny-five");
var board = new five.Board();
var socket = io.connect('[YOUR SERVER URL HERE]');

board.on("ready", function() {

	var register = new five.ShiftRegister({
		pins: {
			data: 11,
			clock: 12,
			latch: 13
		}
	});

	// Confirm the connection was successful
	socket.on('connect', function () {
		console.log('connected to server!');
	});

	socket.on('signal', function(signal) {
		console.log('heard a signal: '+signal);

		// I wired my board backwards, oops
		signal = signal.split('').reverse().join('');

		// Convert signal string to integer
		var parsed = parseInt(signal, 2);
		register.send(parsed);
	});

});