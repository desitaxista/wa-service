const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const cors = require('cors')

// Path where the session data will be stored
 
const client = new Client({
    authStrategy: new LocalAuth()
});
 
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log("");
    console.log(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    // if (msg.body == '!ping') {
        msg.reply(msg.body);
    // }
});

 

client.initialize();




const express = require('express');
const app = express();
app.use(cors())

app.get('/sendMsg/:driver/:reservation/:type',async  (req, res) => {
    // console.log(req);
    // console.log(req.params);
    // console.log(numbers[req.params.driver]);
    console.log(req.params.type);
    console.log("Nueva serserva\n https://desidriver.vercel.app/reservation/"+req.params.reservation);
    // let x = await client.getNumberId("34613572433")
    // console.log(x);
    // let y = await client.getNumberId("613572433")
    // console.log(y);
    // client.sendMessage(numbers[req.params.driver], ("Nueva serserva\n https://desidriver.vercel.app/reservation/"+req.params.reservation)); 
    client.sendMessage(numbers[req.params.driver],  "Nueva reserva \n https://desidriver.vercel.app/reservation/"+req.params.reservation ) ; 
    res.send('<h1>Bye</h1>'); 
});
app.listen(8088, () => {
    console.log('listening on *:3003' + process.env.PORT);
});

const { io } = require("socket.io-client");
// const socket = io();
// const socket = io("http://localhost:3003");
 const socket = io("https://desitaxista.herokuapp.com");

socket.on('askForRole', (msg) => {
    console.log("asked for role \n");
    // let role = "smsService"
    socket.emit("setRole","waService"); 
});

 

socket.on('sendWhatsapp', (data) => {
    console.log(data); 
    client.sendMessage(data.phone,  data.messagePrefix+"\n https://desidriver.vercel.app/reservation/"+data.reservationId ) ; 

})