const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set up a WebSocket connection
io.on('connection', function(socket){
  console.log('A user connected');

  // Listen for messages
  socket.on('chat message', function(msg){
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Listen for disconnection
  socket.on('disconnect', function(){
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log(`Server is running on http://localhost:${port}`);
});