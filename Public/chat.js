const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let action = document.getElementById('action');
//let datos = document.getElementsById('datos');
btn.addEventListener('click', function (){
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});
message.addEventListener('keypress', function(){
    console.log(username.value);
    socket.emit('chat:typing', username.value)
});

/*datos.addEventListener('keypress', function(){
    socket.emit('datos',vector[0])
});*/ 
socket.on('chat:message', function(data) {
    action.innerHTML ='';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

/*socket.on = function(cadena){
    var vector = cadena.split("/");
    output.innerHTML += `<p>
        <strong>${vector[0]}</strong>: ${vector[1]}
    </p>`
};*/

socket.on('chat:typing',function(data){
    action.innerHTML = `<p>
    <em>${data} is typing a message </em>
</p>`
});