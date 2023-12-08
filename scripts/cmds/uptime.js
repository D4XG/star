const moment = require("moment-timezone");
const fs = require("fs");
const os = require("os");
const request = require("request");
const fast = require("fast-speedtest-api");
const { cpu, osInfo } = require("systeminformation");
const pidusage = require("pidusage");
const axios = require("axios");
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
    name: "uptime",
    aliases: ["upt"],
    version: "3.0",
    author: "D4XG",
    countDown: 0,
    role: 0,
    shortDescription:
      "Auto UPTIME | Server SPECS\nDisplays the total number of users of the bot and check uptime",
    longDescription:
      "Auto UPTIME | Server SPECS\nDisplays the total number of users of the bot and check uptime",
    category: "user",
    guide: {
      en: "    {pn}",
      vi: "    {pn}",
    },
  },
  onStart: async function ({
    args,
    api,
    message,
    event,
    usersData,
    threadsData,
  }) {
    // CPU Usage
    const cpuCount = os.cpus().length;
    const osTotalMem = os.totalmem();
    const avbMem = Math.floor(osTotalMem / (1024 * 1024));
    const arch = os.arch();

    // IP CHECKER
    const nwif = os.networkInterfaces();

    // Server infomation
    const { manufacturer, brand, speed, physicalCores, cores } = await cpu();
    const { platform: OSPlatform } = await osInfo();

    // Usage
    const byte_fm = os.freemem();
    const byte_tm = os.totalmem();
    const gb_fm = (byte_fm / (1024 * 1024 * 1024)).toFixed(2);
    const gb_tm = (byte_tm / (1024 * 1024 * 1024)).toFixed(2);
    const u_mem = ((byte_tm - byte_fm) / (1024 * 1024 * 1024)).toFixed(2);

    // Uptime, Ping, Imgur
    const timeStart = Date.now();
    const allUsers = await usersData.getAll();
    const allThreads = await threadsData.getAll();
    const now = moment().tz("Asia/Jakarta");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    const upt = process.uptime();
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days} Day(s) : ${hours} Hr(s) : ${minutes} Min(s) : ${seconds} Secs`;

    const dateNow = Date.now();

    message.reply({
      body: `
⭐ | STAR Uptime\n${uptimeString}\n\n🥽 | Users:\n- Total users: ${
        allUsers.length
      }\n- Total threads: ${allThreads.length}\n\n🛠 | Admin: ${
        global.GoatBot.config.adminBot.length
      }
📋 | Global prefix: ${global.GoatBot.config.prefix}
📻 | Thread Prefix: ${getPrefix(
        event.threadID
      )}\n\n⌚ | Time now: ${time}\n📡 | Latency: ${
        Date.now() - timeStart
      }ms\n🖥 | SPECS:\n- Chip CPU: ${manufacturer} ${brand}\n- Operating system: ${OSPlatform}\n- CPU: ${cpuCount} | Cores: ${physicalCores}\n- Ram: ${gb_fm}GB | Arch: ${arch}\n- Speed: ${speed}MHz\n\n📡 | IP: ${
        nwif["eth0"][0].address
      } - ${nwif["eth0"][0].family}\n📅 | Date: ${date}`,

      attachment: fs.createReadStream(
        `scripts/cmds/assets/image/staruptime.gif`
      ),
    });
  },

  onChat: async function ({ event, message, usersData, threadsData }) {
    if (event.body && event.body.toLowerCase() === "uptime") {
      this.onStart({ message, event, usersData, threadsData });
    }
  },
};
