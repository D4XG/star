const moment = require("moment-timezone");
const fs = require("fs-extra");
function getPrefix(threadID) {
  if (!threadID || isNaN(threadID))
    throw new Error("The first argument (threadID) must be a number");
  threadID = String(threadID);
  let prefix = global.GoatBot.config.prefix;
  const threadData = global.db.allThreadData.find(
    (t) => t.threadID == threadID
  );
  if (threadData) prefix = threadData.data.prefix || prefix;
  return prefix;
}
module.exports = {
  config: {
    name: "\n",
    version: "1.0",
    countDown: 0,
    role: 0,
    category: "owner",
  },
  onStart: async function ({ message, event, usersData, threadsData }) {
    const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY | HH:mm:s");
    const upt = process.uptime();
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${hours}hrs ${minutes}mins ${seconds}secs`;
    const imagePath = "./scripts/cmds/assets/image/starpremium.gif";
    const imageStream = fs.createReadStream(imagePath);
    message.reply({
      body: `
======= [ STAR ] ========
✦ ━━━━━ ★ ━━━━━ ✦
${time}
✦ ━━━━━ ★ ━━━━━ ✦
⭐ | Uptime: ${uptimeString}
🛠 | Admin: ${global.GoatBot.config.adminBot.length}
📋 | Global prefix: ${global.GoatBot.config.prefix}
📻 | Thread Prefix: ${getPrefix(event.threadID)}
👀 | Total users: ${(await usersData.getAll()).length}
🙌 | Total group: ${(await threadsData.getAll()).length}`,
      attachment: imageStream,
    });
  },
  onChat: async function ({ event, message, usersData, threadsData }) {
    if (event.body == getPrefix(event.threadID)) {
      this.onStart({ message, event, usersData, threadsData });
    }
  },
};
console.log(__dirname);
