const express = require("express");
const app =express();
const path = require('path');
const hostname = 'localhost';
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {   //연결이 들어오면 실행되는 이벤트
    // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.
    
    //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
    socket.emit('usercount', io.engine.clientsCount);

    socket.on("join_room",room =>{
        socket.join(room);
        });
    // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
    socket.on('message', (msg) => {
        //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
        console.log('Message received: ' + msg);

        // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
        io.emit('message', msg);
    });
});

//const port ='3000';

const port =process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'src')));
//app.use(express.static(__dirname + '/src'));
server.listen(3000, () => {
    console.log('Server is running  :${port}');
});

