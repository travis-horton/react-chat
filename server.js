#!/usr/bin/env node
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const express = require('express');

const port = process.env.PORT || 80;

// BASE_PATH: the address the chat lives under, e.g. `/chat` behind
// travish.com's web server (www.travish.com/chat/). Empty (the default) puts it
// at the root, so `PORT=8081 npm start` still answers on http://localhost:8081.
// Everything the server answers — the page, its files and the live connection
// — moves under it together; the page works out the same prefix from its own
// address (static/client.js), so the two always agree.
const basePath = (process.env.BASE_PATH || '').replace(/\/+$/, '');
if (basePath !== '' && !basePath.startsWith('/')) {
	throw new Error(`BASE_PATH must start with "/" (got "${process.env.BASE_PATH}")`);
}

// Limits that keep one visitor from spoiling it for everyone. Not moderation:
// nothing is read or judged, only counted.
const MAX_NAME = 24;           // characters in a name
const MAX_MESSAGE = 500;       // characters in a message
const BURST = 5;               // messages (joins and renames count) per socket...
const BURST_WINDOW_MS = 5000;  // ...in any 5 seconds; the rest are dropped
const KEPT = 50;               // messages kept in memory, newest first
const SHOWN = 20;              // messages sent to the page

const app = express();
app.disable('x-powered-by');
const server = http.Server(app);

server.listen(port, function() {
	console.log(`Chat server listening on ${port}${basePath ? ` under ${basePath}/` : ''}`);
});

const page = path.join(__dirname, 'index.html');

// `/chat` without the slash would make the page's relative addresses point at
// the site's root, so it is sent to `/chat/` first. (Express matches a route
// with or without its trailing slash, hence the look at the raw address.)
app.get(basePath + '/', function(req, res) {
	if (!req.originalUrl.split('?')[0].endsWith('/')) {
		return res.redirect(301, basePath + '/');
	}
	res.sendFile(page);
});
app.get(basePath + '/index', function(req, res) {
	res.sendFile(page);
});
app.use(basePath || '/', express.static(path.join(__dirname, 'static')));

let io = new Server(server, {
	path: basePath + '/socket.io',
	// the largest thing one message may be, in bytes (socket.io's default is 1 MB)
	maxHttpBufferSize: 4096,
});
let users = [];
let messages = [];

io.on('connection', function(socket) {
	let recent = [];

	socket.on('message', function(data, fn) {
		const now = Date.now();
		recent = recent.filter(time => now - time < BURST_WINDOW_MS);
		if (recent.length >= BURST) {return};
		recent.push(now);
		send(data, socket, fn);
	});

	socket.on('disconnect', function () {
		let user = users.find(user => user.id === socket.id);
		// forget them entirely, so the list of names can't grow forever
		users = users.filter(user => user.id !== socket.id);
		if (user) {
			let goodbye = `user ${user.name} has left`;
			io.emit('message', goodbye);
			io.emit('status', users);
		};
	});
});

function send(data, socket, fn) {
	let user = users.find(user => user.id === socket.id);

	if (data && typeof data === 'object') {
		let name = typeof data.name === 'string' ? data.name.trim() : '';
		if (name.length > MAX_NAME) {
			if (typeof fn === 'function') {fn(`names are at most ${MAX_NAME} characters, `)};
			return;
		}
		if (!(uniqueName(name, users))) {
			if (typeof fn === 'function') {fn('name taken, ')};
			return;
		}

		if (!user) {
			addNewUser(socket.id, name);
			return;
		}

		if (data.oldName) {
			changeName(name, user)
		}
		return;
	};

	// a message from someone who hasn't joined yet has no name to go with it
	if (!user) {return};
	if (typeof data !== 'string') {return};

	let body = data.trim();
	if (body.length === 0 || body.length > MAX_MESSAGE) {return};

	remember({body: body, user: user.name, timeStamp: new Date()});

	io.emit('message', messages.slice(0, SHOWN));
}

function remember(message) {
	messages.unshift(message);
	messages.length = Math.min(messages.length, KEPT);
}

function uniqueName(name, users) {
	if (name === '' || name === null) {return false};
	for (let user of users) {
		if (user.name === name) {return false};
	};
	return true;
}

function addNewUser(id, name) {
	users.push({
		id: id,
		name: name,
		joinTime: new Date(),
		active: true
	});

	io.emit('status', users);
	io.emit('message', messages.slice(0, SHOWN));
}

function changeName(name, user) {
	remember({
		body: `${user.name} change their name to ${name}`,
		user: 'THE SERVER',
		timeStamp: new Date()
	});

	user.name = name;

	io.emit('message', messages.slice(0, SHOWN));
	io.emit('status', users);
}

// `docker stop` sends SIGTERM; as the container's first process, node would
// otherwise ignore it and be killed 10 seconds later.
process.on('SIGTERM', function() {
	process.exit(0);
});
