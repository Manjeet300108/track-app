// socket io setup

const express =  require('express');
const app = express();

const http = require('http');
const path = require('path');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

//setup ejs and static files
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection',function(socket){
    socket.on('send-location',function(data){
        io.emit('recevie-location',{id : socket.id,...data});
    })

    socket.on('disconnected',function(){
        io.emit('user-disconnect',socket.id)
    })
})

app.get('/',function(req,res){
    res.render('index');
})


server.listen(3000);