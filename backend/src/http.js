const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

app.use(express.json())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

module.exports = { server, io, app };