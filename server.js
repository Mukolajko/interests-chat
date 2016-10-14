'use strict';

const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
//routes require
const apiRouter = require('./routes/ApiRouter');
const mainRouter = require('./routes/MainRouter');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//directory to get jquery,bootstrap or other libs
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/public')));
//include routes to use with corresponding paths
app.use('/api', apiRouter);
app.use('/home', mainRouter);
//for now..This will be handled by security api
app.get('/', function(req, res){
   res.redirect("/home");
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log(socket.id);
    });
    socket.on('it', function(msg){
        io.emit('it', msg);
    });
    socket.on('porno', function(msg){
        //some huge code to detect correct user and start chat.
        io.emit('porno', msg);
    });
    socket.on('default', function(msg){
        io.emit('default', msg);
    });
});

server.listen(3000, function(){
    console.log('listening on *:3000');
});