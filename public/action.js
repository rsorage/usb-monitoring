var socket = io();
socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
