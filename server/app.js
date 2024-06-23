const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:8080"],
        credentials: true
    }
});

app.get('/', async (req, res) => {
    return res.send(123);
});

app.listen(3000, async () => {
    console.log('Server started');
});


io.on("connection", (socket) => {
    socket.on('message', (data) => {
        socket.emit('message', data);
    })
});

instrument(io, {
    auth: false,
    mode: "development",
});


httpServer.listen(3001);
