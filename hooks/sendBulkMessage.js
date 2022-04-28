module.exports=function (client,numberArray,message) {
    numberArray.forEach( (element) => {
        let number =element;
        let chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId,message);
        
    });
 }

