const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);

let counter=0;
const userMap = new Map();

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//socket.emit skickar endast till användaren som kallade på det.
//io.emit skickar till alla.


function onConnection(socket){
  
  const userName = socket.handshake.query.userName;

  console.log(userName + ": user connected");
  counter++;
  io.emit("userCount", counter)

  userMap.set(socket.id , userName );
  // socket.broadcast.emit("userPerson", userMap.get(socket.id) )
  io.emit("userList", Object.fromEntries(userMap))

  socket.broadcast.emit("chat message", userName + " - User have Connected.");

  socket.on('disconnect', () => {
    console.log(userName + ": user disconnected");
    counter--;
    io.emit("userCount", counter);

    userMap.delete(socket.id)
    io.emit("userList", Object.fromEntries(userMap))
    
    socket.broadcast.emit("chat message", userName + " - User have Disconnected")
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

    socket.broadcast.emit('chat message', msg); // Skickar chat meddelendet till alla förutom avsendaren.
  });
  socket.on("typing", (userName) =>
  {
    userName = socket.handshake.query.userName;
    console.log(userName);
    socket.broadcast.emit("typing", userName)
  })
});


server.listen(3002, () => {
  console.log('listening on *:3002');
});