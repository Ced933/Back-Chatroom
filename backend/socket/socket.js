// pour avoir les message en temps reel

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    // tous les message que je reçois sauf les miens
    socket.broadcast.emit("recieve_message", data);
  });
});

module.exports = { app, io, server };
