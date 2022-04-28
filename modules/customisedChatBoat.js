const express = require('express');
const router = express.Router()
const cors = require('cors');
router.use(cors());
const client=require("./client");


// middleware that is specific to this router

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', async (req, res) => {
    res.send("Custom");
})
// define the about route
router.get('/get',async(req, res) => {
const data= await getCurrentContacts(client);
  res.send(data);
})

module.exports = router