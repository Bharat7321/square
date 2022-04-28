var fs = require('fs');
const getQrCodeText=()=>{
var data = fs.readFileSync('./config.json'),
myObj;

try {
myObj = JSON.parse(data);
return myObj;
}
catch (err) {
console.log('There has been an error parsing your JSON.')
console.log(err);
return "Error";
}
}

module.exports=getQrCodeText;