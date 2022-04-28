
var fs = require('fs');
const express=require('express');
const qrcode = require('qrcode-terminal');
const app = express();
const cors = require('cors');
const updateQrcode = require('./hooks/updateQrcode');
const getQrCodeText = require('./hooks/getQrCodeText');
const { Client } = require('whatsapp-web.js');
const sendBM = require('./hooks/sendMessageBulk');

const home=require("./modules/home");
const send=require("./modules/sendMessage");
app.use("/home",home);
app.use("/send",send);


app.use(cors())
const port = 7000;

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
 sendBM(client,["+917321965118","+917368018441"],"Testing the future");

} catch (error) {
    console.log("error is here");
    
}

});

client.on('message',async msg=>{
const optionsMesage= "Thanks for the message. \n For searching about anything type: Search Space SearchItem";
 console.log(msg.body);
    console.log(msg,"Recieved Sonething");
})


client.on("disconnected",()=>{
    updateQrcode("",false);
})





//routing

app.get('/send/:number/:message', (req, res) => {
    const data = req.params;
    let numLength=(data.number).length;
    let numArray=[];
    let count =0;
    if(numLength%12==0){
        for(count=1;count<=(numLength/12);count++){
         numArray.push("+"+data.number.slice(12*(count-1),12*count));
        }
          console.log("cc",data.number,numArray);
        sendBM(client,numArray,data.message);
        res.send('Hello Message!' +numArray);
    }else {
        res.send("Type The Numbers Properly");
    }
    
  })


  app.get('/getqr', (req, res) => {
    res.send(getQrCodeText());
  })
  app.get('/getCurrent', (req, res) => {
    res.send("No data");
  })
  app.get("/",async (req,res)=>{
      const cpromise=await client.getContacts();
      console.log(cpromise,"pp",typeof(cpromise));
      console.log(Object.keys(cpromise),"keys");
      console.log(cpromise[0].number,"first");
      let contacts_list=[];
      let str="";
      cpromise.forEach((element)=>{
          contacts_list.push({name:element?.name,number:element?.number});
          str=str+"Name: "+element?.name+" Number: "+element?.number+"\n";
      })
      console.log(str);
      console.log( await client.getState());


      
  })


  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

client.initialize();

