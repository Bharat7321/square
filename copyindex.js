const qrcode = require('qrcode-terminal');

const { Client, MessageMedia } = require('whatsapp-web.js');
const {sendBulkMesssage} = require('./hooks/sendBulkMessage');
const express = require('express');
const updateQrcode = require('./hooks/updateQrcode');
const app = express();
const port = 6969;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

console.log(sendBulkMesssage);

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async()=> {
console.log('Client is ready!');


sendBulkMesssage(client,["+917321965118","+917368018441","+919709985559","+919431426600","+918102930609","+919631826788"],"Hi Offer Plant Testing Bulk Message 2");


});

client.on("disconnected",()=>{
    updateQrcode("",false);
})



const optionsMesage= "Thanks for the message. \n For searching about anything type: Search Space SearchItem";

client.on('message',async msg=>{
    if(msg.body==="start"){
        msg.reply(optionsMesage);
    }
    else if((msg.body).split(" ")[0] === "search"){
        msg.reply("Your search for "+(msg.body).split()[1]+" is proceessed");

    }
    msg.reply();

    console.log(msg,"Recieved Sonething");
})





client.initialize();