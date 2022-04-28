var fs = require('fs');


const useGetCurrentMessages=()=>{
    

const setCurrentMessage=(message)=>{
    var mdata = {
        cmessage:message,
        time:new Date()
       };
       
       var data = JSON.stringify(mdata);

    fs.writeFile('./cmessage.json', data, function (err) {
        if (err) {
          console.log('There has been an error saving your configuration data.');
          console.log(err.message);
          return;
        }
        console.log('Configuration saved successfully.')
      });
}

const getCurrentMessage=(message)=>{

   const data= fs.readFile('./cmessage.json');
   try {
    let message=JSON.parse(data);
    message.status="Success";
    return message;
   } catch (error) {
       return {status:"Error"};
       
   }


}

 return {getCurrentMessage,setCurrentMessage};
}

module.exports =useGetCurrentMessages;