const client=require("./modules/client");
const app=require("./modules/app");
const getQrCodeText = require("./hooks/getQrCodeText");
const { MessageMedia } = require('whatsapp-web.js');
const sendBMM = require("./hooks/sendBMM");
const replyToMessage = require("./chatUtils/possibleReply");
const port=process.env.PORT || 7000;

const sendMedia= async ()=>{
  const media=await MessageMedia.fromUrl('https://www.mykhel.com/img/2022/01/cricket-1642491052.jpg');
//const media = MessageMedia.fromFilePath('./aaaaaa.jpeg');
  sendBMM(client,["+917321965118"],media);
}

app.listen(port, () => {
    console.log(` WhatUi listening on port ${port}`)
  })

  client.initialize();
  client.on("ready",async ()=>{
    sendMedia();
  })

  client.on('message', async (message) => {
      console.log(message.body);
      console.log(replyToMessage);
      replyToMessage.forEach((replyandMessage)=>{
          if(replyandMessage.message===message.body){
              message.reply(replyandMessage.reply);
          }

      })
      if(message.body==="score"){
          message.reply(" check at https://www.cricbuzz.com/");
      }
      else if(message.body==="photo"){
          sendMedia();
      }

       
});


