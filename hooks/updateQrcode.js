var fs = require('fs');

const updateQrcode =(qr,isReady)=>{

var myOptions = {
 type:"text",
 qrText:qr,
 isReady:isReady,
 time:new Date()
};

var data = JSON.stringify(myOptions);

fs.writeFile('./config.json', data, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});
}

module.exports=updateQrcode;