# Lightboard Arduino/Socket.io demonstration

Control a series of 8 LEDs with a pure JavaScript web interface utilizing Node, Vue, Socket.io, Nunjucks, and Johnny Five.

![Web Interface controlling 8 LEDs](http://www.leemichaelmoran.com/img/lightboard.jpg)

### Requirements
- **NodeJS** installed on both a web server and the computer connected to your Arduino controller
- An **Arduino controller** with at least 3 pins
- 1 **74HC595 Shift Register**, 8 **LEDs**, a **breadboard** and all necessary resistors and jumper wires

### Files
- **package.json** lists Node dependencies
- **/views/index.njk** the web interface template. Includes Vue.js for data binding and Socket.io for relaying light patterns to the server
- **server.js** Node script for the server. Renders the web interface via [Nunjucks](https://mozilla.github.io/nunjucks/), initializes the light pattern, and relays incoming patterns to other connected clients
- **bridge.js** listens to the server for light pattern signals and sends them to a shift register on your Arduino board via [Johnny Five](http://johnny-five.io/)
- **/public/assets/** static CSS and a background image for aesthetics
- **diagram.fzz** A [Fritzing](http://fritzing.org/) diagram of the breadboard

### Instructions

1. Wire your 74HC595 and 8 LEDs to your breadboard. I've included a Fritzing diagram of mine, but you can rearrange however you like
2. Upload **server.js**, **package.json**, and the **/public** and **/views** directories to your web server
3. From the working directory of your web server, run `npm install` and `node server`. You should now be able to see the web interface by browsing to `http://[YourServerURL]:3000`
4. On the computer connected to the Arduino controller, update Line 9 of **bridge.js** with your server URL. The script assumes _your Data Pin is 11, your Clock Pin is 12, and your Latch Pin is 13_. If this is not the case, update lines 15-17 accordingly
5. From the working directory of the Arduino-connected computer, run `npm install` and `node bridge`
6. That's it! The web interface now controls your breadboard, and any browsers pointed at your server will be live-updated with the selected pattern.