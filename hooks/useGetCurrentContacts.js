const getCurrentContacts= async (client)=>{
let contacts_list=[];
const contact_promise=await client.getContacts();
contact_promise.forEach(element => {
    contacts_list.push({name:element?.name,number:element?.number});
    console.log(element);
});
const data={
    contacts:contacts_list,
    total:contacts_list?.length
};
return data;
}

module.exports=getCurrentContacts;