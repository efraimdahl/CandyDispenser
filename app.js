'use strict';

const server = require('http').createServer();
const app = require('./http-server');
const port = process.env.PORT || 3000;
const WebSocket = require('ws');


// Mount our express HTTP router into our server
server.on('request', app);
console.log('Node server running on port 3000');


const wss = new WebSocket.Server({ server });


function heartbeat() {
    this.isAlive = true;
};

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Establish connections and handle events
wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.room = '';
    ws.nick = '';
    ws.inGame = false;
    console.log("Websocket connected");
    ws.on('pong', heartbeat);

    ws.on('message', (message) => {
        //console.log(message);
        try{
        var parsedMessage = JSON.parse(message);
        } catch(e){
            const response = {
                messageType: 'UFHH',
                roomCode: 'noRoom',
                method: "big_ufh"    
            }
            ws.send(JSON.stringify(response));
            return;
        }
        //console.log(parsedMessage);
        //ws.room = radishMsg.roomCode.toLowerCase();
        switch (parsedMessage.messageType) {
        case 'PLAYER_INPUT':{
            console.log(parsedMessage.message);
            
            if(parsedMessage.message=="candy_release"){
                let customResponse = {
                    messageType: "candy_release",
                    value: null
                }
                broadcast(JSON.stringify(customResponse))
            }
        
           else{
               console.log("message type not recognized")
           }
            
        }
        break;
    }
    });
});


function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}


server.listen(port, () => console.log(`Server is listening on port ${port}`));