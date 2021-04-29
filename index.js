var express = require('express');
const { Mongoose } = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var Device = require('./Public/Models/Logs_connection_Iris');
//variables a enviar 
var ip_address;
var gateway_address;
var mac_address;
var mask;
var device_name;
var type;
var horaActual;
var dateNow;
var messages = [{
  id: 1,
  text: "Informacion de cliente estacionario recibida",
  author: "Servidor"
}];


const ver = mongoose.connect('mongodb://root:MongolitoDes2021SVR@10.10.166.89:27017/UATF_RSweb')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));
app.use(express.static('public'));

//Obtener lista de dispositivos

findAllLogs = function(req, res){
  Device.find({}, function(err,logs){
    if(err){
      res.send(500,err.message)
      console.log(err.message)
    }
    res.status(200).json(logs)
  })
}

var logsItems = express.Router();

  logsItems.route('/logs')
    .get(findAllLogs);

app.use('/api', logsItems)
//connecting to mongodb
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  console.log('ID : '+socket.id);

  socket.on('new-message', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });

  socket.on('send_IP', function(data){
    ip_address = data;
    console.log("Direccion IP del equipo : "+data);
  });
  socket.on('send_Gateway', function(data){
    gateway_address = data;
    console.log("Puerta de enlace del equipo : "+data);
  });
  socket.on('send_Mask', function(data){
    mask = data;
    console.log("Mascara del Equipo : "+data);
  });
  socket.on('send_Mac', function(data){
    mac_address = data;
    console.log("Direccion Mac del equipo : "+data);
  });
  socket.on('send_DeviceName', function(data){
    device_name = data;
    console.log("Nombre del equipo : "+data);
  });
  socket.on('send_connection',function(data){
    type = data;
    console.log("Tipo de equipo : "+data)
    dateNow = Date.now();
    dateNow =  new Date(dateNow);
    horaActual = dateNow.getHours()+':'+dateNow.getMinutes();
    add();
  })
});

function add(){
  const newDevice = {
    name: device_name,
    ip: ip_address,
    gateway: gateway_address,
    mask: mask,
    mac: mac_address,
    device_type: type,
    date_time: dateNow.toLocaleDateString()+' '+horaActual
  }


  var device = new Device(newDevice);
  device.save(function (err){
    if(err){
      console.log(err)
    }else{
      console.log('usuario añadido')
    }
  })
}

server.listen(9001, '0.0.0.0', () => {
  console.log("Servidor corriendo en http://localhost:9001");
});

