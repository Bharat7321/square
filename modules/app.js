
var fs = require('fs');
const express=require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const home=require("./home");
const send=require("./sendMessage");
const customisedChatBoat=require("./customisedChatBoat");
const client = require('./client');
const sendBM=require("../hooks/sendMessageBulk");
const getQrCodeText=require("../hooks/getQrCodeText");
app.use("/home",home);
app.use("/send",send);
app.use("/custom",customisedChatBoat);
app.use(cors())

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
      res.send(await client.getState() + str );

   res.send(" Its working");
    res.sendFile(path.join(__dirname,'/index.html'));


      
  })
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"/errorpage.html"));
  })


module.exports=app;


