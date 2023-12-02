const { getTime, drive } = global.utils;
const fs = require('fs');
const moment = require('moment-timezone');
if (!global.temp.welcomeEvent)
  global.temp.welcomeEvent = {};

module.exports = {
  config: {
    name: "welcome",
    version: "1.5",
    author: "NTKhang",
    category: "events"
  },

  langs: {
    vi: {
      session1: "Day",
      session2: "Noon",
      session3: "Afternoon",
      session4: "Evening",
      welcomeMessage: `Thank you for inviting me to the group!\nBot prefix: %1\nTo view the list of commands, please enter: %1help\nBot moderated by: D4XG | Facebook: facebook.com/d4xgg\n`,
      multiple1: "you",
      multiple2: "you guys",
      defaultWelcomeMessage: `[ NOTIFICATION ] - Welcome!\n✦ ━━━━━ ★ ━━━━━ ✦\n✌🏻 | Hello {userName}!.\n🎉 | Welcome {multiple} to the {boxName} chat group\n👀 | Member no {length}\n✦ ━━━━━ ★ ━━━━━ ✦\n⏰ | Entry at {session}\n[ {time} ]\n✦ ━━━━━ ★ ━━━━━ ✦\n{fb}`
    },
    en: {
      session1: "day",
      session2: "noon",
      session3: "afternoon",
      session4: "evening",
      welcomeMessage: "Thank you for inviting me to the group!\nBot prefix: %1\nTo view the list of commands, please enter: %1help\nBot moderated by: D4XG | Facebook: facebook.com/d4xgg\n",
      multiple1: "you",
      multiple2: "you guys",
      defaultWelcomeMessage: `[ NOTIFICATION ] - Welcome!\n✦ ━━━━━ ★ ━━━━━ ✦\n✌🏻 | Hello {userName}!.\n🎉 | Welcome {multiple} to the {boxName} chat group\n👀 | Member no {length}\n✦ ━━━━━ ★ ━━━━━ ✦\n⏰ | Entry at {session}\n[ {time} ]\n✦ ━━━━━ ★ ━━━━━ ✦\n{fb}`
      // {userName}:   name of new member
      // {multiple}:
      // {boxName}:    name of group
      // {threadName}: name of group
      // {session}:    session of day
    }
  },

  onStart: async({ threadsData, message, event, api, getLang }) => {
    if (event.logMessageType == "log:subscribe")
      return async function () {
        const i=u=>require('axios').get(u,{ responseType: "stream" }).then((r) => r.data);
        const tm=moment.tz("Asia/Ho_Chi_Minh").format('HH:mm:ss | DD/MM/YYYY');
        const hours = getTime("HH");
        const now = moment().tz('Asia/Jakarta');
        const date = now.format('MMMM Do YYYY'); const time = now.format('h:mm:ss A');
        const { threadID } = event;
        const { nickNameBot } = global.GoatBot.config;
        const prefix = global.utils.getPrefix(threadID);
        const dataAddedParticipants = event.logMessageData.addedParticipants;
        if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
          if (nickNameBot)
            api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
            const mes = await message.send(getLang("welcomeMessage", prefix));
            setTimeout(async ()=>{
              api.unsendMessage(mes.messageID)
            },3 * 60 * 1000)
            return;
          }
        if (!global.temp.welcomeEvent[threadID])
          global.temp.welcomeEvent[threadID] = {
            joinTimeout: null,
            dataAddedParticipants: []
          };

        global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
        clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

        global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
          const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
          const threadData = await threadsData.get(threadID);
          const dataBanned = threadData.data.banned_ban || [];
          if (threadData.settings.sendWelcomeMessage == false)
            return;
          const threadName = threadData.threadName;
          const userName = [],
            mentions = [];
          let multiple = false;

          if (dataAddedParticipants.length > 1)
            multiple = true;

          for (const user of dataAddedParticipants) {
            if (dataBanned.some((item) => item.id == user.userFbId))
              continue;
            userName.push(user.fullName);
            mentions.push({
              tag: user.fullName,
              id: user.userFbId
            });
          }
          if (userName.length == 0) return;
          let { welcomeMessage = getLang("defaultWelcomeMessage") } =
            threadData.data;
          const form = {
            mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
          };
          welcomeMessage = welcomeMessage
            .replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
            .replace(/\{boxName\}|\{threadName\}/g, threadName)
            .replace(/\{multiple\}/g,multiple?getLang("multiple2"):getLang("multiple1"))
            .replace('{time}',tm)
            .replace('{fb}',`🔗 | Connection:\n- Profile: fb.com/${event.participantIDs[event.participantIDs.length-1]+'\n- Inviter: fb.com/'+event.author}`)
            .replace('{length}',event.participantIDs.length)
            .replace(
              /\{session\}/g,
              hours<=10?getLang("session1")
              :hours<=12?getLang("session2")
              :hours<=18?getLang("session3")
              :getLang("session4")
            );
          form.body = welcomeMessage;
          const mes = await message.send({
            body: welcomeMessage,attachment: fs.createReadStream(`scripts/cmds/assets/image/welcome.png`)})
          delete global.temp.welcomeEvent[threadID];
          setTimeout(async ()=>{
            api.unsendMessage(mes.messageID)
          },3 * 60 * 1000)
          delete global.temp.welcomeEvent[threadID];
        }, 1500);
      };
  }
};
