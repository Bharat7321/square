const sendBM= (client,numberArray,message)=>{
    numberArray.forEach(  async (element) => {
        // let number =element;
        // let chatId = number.substring(1) + "@c.us";
        // const status= client.sendMessage(chatId,message);
        // console.log("status",status,number,message);

const number_details = await client.getNumberId(element); // get mobile number details

if (number_details) {
    const sendMessageData = await client.sendMessage(number_details._serialized, message); // send message
} else {
    console.log(final_number, "Mobile number is not registered");
}
        
    });

    
    }
    module.exports=sendBM;