const moment = require('moment-timezone'); 
module.exports = { config: { 
  name: "console", 
  version: "1.0", 
  countDown: 0, 
  role: 0, 
  category: "owner", 
  envConfig: {} }, 
  onStart: async function ({ message,event,usersData,threadsData}){
var time=moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY | HH:mm:s");
console.log(`[🥽  ] Uid: ${event.senderID}
[🎿  ] Tid: ${event.threadID}
[⌚  ] Time: ${time}
[📋  ] Nội dung: ${event.body}
[📦  ] Tên nhóm: ${(await threadsData.get(event.threadID)).threadName}
[👀  ] Tên người dùng: ${await usersData.getName(event.senderID)}
✦ ━━━━━━━━━━━━━━━━ ★  ━━━━━━━━━━━━━━━━ ✦`
)
},
  onChat: async function({ event,message,usersData,threadsData}) {
    if(event.body && event.body.toLowerCase() !== 0)
    {this.onStart({ message,event,usersData,threadsData})
    }}};