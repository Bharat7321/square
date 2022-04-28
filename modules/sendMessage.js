const express = require('express')
const sendBM = require('../hooks/sendMessageBulk')
const client=require("./client");
const router = express.Router()
const cors = require('cors');
router.use(cors());
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.get('/', async (req, res) => {
  res.send('Welcome send page');
})

router.get('/message/:number/:message', (req, res) => {
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


router.post('/alltype/', (req, res) => {

  console.log(req.params);
  res.send(req);
  // const data = req.params.data;
  // let numArray=decodeURIComponent(data.numbersArray);
  // console.log("data",data,typeof(data));
  // if(typeof(data)==="object"){
  //   console.log(Object.keys(data),"keys");
  // }else{
  //   console.log("values",data.length);
  // }
  //     console.log("numArray",numArray);
  //     console.log("linksArray",decodeURIComponent(data));
  //     console.log("mesaages",decodeURIComponent(data.message));
  //    // sendBM(client,numArray,decodeURIComponent(data.message));
  //     res.send('Hello Message!' +numArray);
 
})





// define the about route
router.get('/about', (req, res) => {
  res.send('About send')
})

module.exports = router