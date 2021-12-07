const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function onConnection(socket){
  
  const userName = socket.handshake.query.userName;
  console.log(userName + ': user connected');

  io.emit("chat message", userName + " - User have Connected.");
  socket.on('disconnect', () => {
    console.log(userName + ": user disconnected");
    io.emit("chat message", userName + " - User have Disconnected")
  });
}

io.on('connection', onConnection)

// io.on('connection', (socket) => {

//   const userName = socket.handshake.query.userName;
//   console.log(userName + ': user connected');

//   io.emit("chat message", userName + " - User have Connected.");
//   socket.on('disconnect', () => {
//     console.log(userName + ": user disconnected");
//     io.emit("chat message", userName + " - User have Disconnected")
//   });
// });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log("Message - " + msg);

    socket.broadcast.emit('chat message', msg); // Skickar till alla förutom avsendaren.
  });
});


server.listen(3001, () => {
  console.log('listening on *:3001');
});