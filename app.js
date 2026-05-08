const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

const path = require('path');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location",function (data){
        io.emit("receive-location",{id:socket.id , ...data})
    });
    console.log("connected");
    socket.on("disconnect", function(){
        io.emit("user-disconnected",socket.id);
    })
});

app.get("/", (req, res)=>{
    res.render("index");
});

server.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});