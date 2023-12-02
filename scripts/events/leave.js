let { getTime, drive } = global.utils;
let fs = require('fs');
let moment = require('moment-timezone');

module.exports = {
  config: {
    name: "leave",
    version: "1.4",
    author: "NTKhang",
    category: "events"
  },

  langs: {
    vi: {
      session1: "Morning",
      session2: "Noon",
      session3: "Afternoon",
      session4: "Evening",
      leaveType1: "left",
      leaveType2: "been kicked out of",
      defaultLeaveMessage: "[ NOTIFICATION ] - Goodbye!\n✦ ━━━━━ ★ ━━━━━ ✦\n👋🏻 | {userName} had {type} the chat ( {boxName} )\n😢 | Hope to see you again!\n✦ ━━━━━ ★ ━━━━━ ✦\n⏰ | Leave at {session}\n[ {time} ]\n✦ ━━━━━ ★ ━━━━━ ✦\n👀 | {tv}\n{out}\n{bucaccho}"
    },
    en: {
      session1: "Morning",
      session2: "Noon",
      session3: "Afternoon",
      session4: "Evening",
      leaveType1: "left",
      leaveType2: "been kicked out of",
      defaultLeaveMessage: "[ NOTIFICATION ] - Goodbye!\n✦ ━━━━━ ★ ━━━━━ ✦\n👋🏻 | {userName} had {type} the chat ( {boxName} )\n😢 | Hope to see you again!\n✦ ━━━━━ ★ ━━━━━ ✦\n⏰ | Leave at {session}\n[ {time} ]\n✦ ━━━━━ ★ ━━━━━ ✦\n👀 | {tv}\n{out}\n{bucaccho}"
    }
  },

  onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
    if (event.logMessageType == "log:unsubscribe")
      return async function () {
        const { threadID } = event;
        const threadData = await threadsData.get(threadID);
        if (!threadData.settings.sendLeaveMessage)
          return;
        const { leftParticipantFbId } = event.logMessageData;
        if (leftParticipantFbId == api.getCurrentUserID())
          return;
        const hours = getTime("HH");
        const now = moment().tz('Asia/Jakarta');
        const date = now.format('MMMM Do YYYY'); const time = now.format('h:mm:ss A');
        const uptime = process.uptime();
        const i=u=>require('axios').get(u,{ responseType: "stream" }).then((r) => r.data);
        const hoursU = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const tm=moment.tz("Asia/Ho_Chi_Minh").format('HH:mm:ss | DD/MM/YYYY');
        const uptimeString = `${hoursU}hrs ${minutes}mins ${seconds}secs`;

        const threadName = threadData.threadName;
        const userName = await usersData.getName(leftParticipantFbId);
        let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
        const form = {
          mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
            tag: userName,
            id: leftParticipantFbId
          }] : null
        };

        leaveMessage = leaveMessage
          .replace(/\{userName\}|\{userNameTag\}/g, userName)
          .replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
          .replace(/\{threadName\}|\{boxName\}/g, threadName)
          .replace(/\{time\}/g,tm)
          .replace('{tv}',`${event.participantIDs.length-1} users remain`)
          .replace('{bucaccho}','- Kicker: fb.com/'+event.author)
          .replace('{out}','🔗 | Connection:\n- User: fb.com/'+ event.logMessageData.leftParticipantFbId)
          .replace(/\{session\}/g, hours <= 10 ?
            getLang("session1") :
            hours <= 12 ?
              getLang("session2") :
              hours <= 18 ?
                getLang("session3") :
                getLang("session4")
          );

        form.body = leaveMessage;

        if (leaveMessage.includes("{userNameTag}")) {
          form.mentions = [{
            id: leftParticipantFbId,
            tag: userName
          }];
        }
        const mes = await message.send({body: leaveMessage,attachment: fs.createReadStream(`scripts/cmds/assets/image/goodbye.png`)})
        setTimeout(async ()=>{
					api.unsendMessage(mes.messageID)
				},3 * 60 * 1000)
      };
  }
};