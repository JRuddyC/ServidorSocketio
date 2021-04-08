var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id: 1,
  text: "Informacion de cliente estacionario recibida",
  author: "Servidor"
}];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hello World!");
});


io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  console.log('ID : '+socket.id);
  
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });

  socket.on('send_IP', function(data){
    console.log("Direccion IP del equipo : "+data);
  });
  socket.on('send_Gateway', function(data){
    console.log("Puerta de enlace del equipo : "+data);
  });
  socket.on('send_Mask', function(data){
    console.log("Mascara del Equipo : "+data);
  });
  socket.on('send_Mac', function(data){
    console.log("Direccion Mac del equipo : "+data);
  });
  socket.on('send_DeviceName', function(data){
    console.log("Nombre del equipo : "+data);
  });
});

server.listen(9001, function() {
  console.log("Servidor corriendo en http://localhost:9001");
});