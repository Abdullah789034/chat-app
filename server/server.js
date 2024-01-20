const express = require('express');
const app = express();
const PORT = 4000;
const {Server} = require('socket.io'); 
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors())

const server= http;
let user=0;

const io = new Server (server, {
  cors: {
      origin: "http://localhost:3000",
      methods:["GET","POST"],
  }
});

//Add this before the app.get() block
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  user++;
  


  socket.on("send_message", (data)=>{
    console.log(data)
    socket.broadcast.emit("recieve_msg",data);
    
  })
  socket.on('disconnect', () => {
    user--;
    console.log('🔥: A user disconnected');
  });
  socket.emit('usernum', user);
});


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
