module.exports = { 
  config: {
        name: "hi",
        version: "1.0",
        countDown: 0,
        role: 0,
        category: "owner",
        envConfig: {} },
        onStart: async function ({ message,event,usersData}){
var time=require('moment-timezone').tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
  message.reply({body: 'Hello '+ await usersData.getName(event.senderID),sticker: "295919034189507"})
},
        onChat: async function({ event,message,usersData}) {
                if(event.body === 'hi')
                {
                  this.onStart({ message,event,usersData})
                }}};