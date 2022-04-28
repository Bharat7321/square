
var fs = require('fs');
const express=require('express');
const qrcode = require('qrcode-terminal');
const updateQrcode = require('../hooks/updateQrcode');
const getQrCodeText = require('../hooks/getQrCodeText');
const { Client } = require('whatsapp-web.js');
const sendBM = require('../hooks/sendMessageBulk');


const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    updateQrcode(qr,getQrCodeText()?.isReady);
    console.log(getQrCodeText());

});

client.on('ready', async()=> {
updateQrcode(getQrCodeText()?.qrText,true);
console.log('Client is ready!',client);

try {
 sendBM(client,["+917321965118"],"Testing the future");

} catch (error) {
    console.log("error is here");
    
}

});



client.on("disconnected",()=>{
    updateQrcode("",false);
})


module.exports=client;