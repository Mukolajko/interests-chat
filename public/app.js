var socket = io();
var interest;
$('#interest').submit(function(){
    interest = $("#selectinterest").find(":selected").val();
    //subsribe to that event
    socket.emit(interest, "Im new user here");
    socket.on(interest, function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    $(".hidneThis").toggle();
    return false;
});
$('#msgform').submit(function(){
    if (!interest) return;
    socket.emit(interest, $('#m').val());
    return false;
});