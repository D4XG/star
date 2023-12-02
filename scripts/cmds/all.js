const moment = require('moment-timezone');
const fs = require('fs');
const os = require('os');
const request = require('request');
const fast = require('fast-speedtest-api');
const { cpu, osInfo } = require('systeminformation');
const pidusage = require('pidusage');
const axios = require('axios');
function getPrefix(threadID) {
  if (!threadID || isNaN(threadID))
    throw new Error('The first argument (threadID) must be a number');
  threadID = String(threadID);
  let prefix = global.GoatBot.config.prefix;
  const threadData = global.db.allThreadData.find(t => t.threadID == threadID);
  if (threadData)
    prefix = threadData.data.prefix || prefix;
  return prefix;
}
module.exports = {
	config: {
		name: "all",
		version: "1.1",
		author: "D4XG",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Tag tất cả thành viên",
			en: "Tag all members"
		},
		longDescription: {
			vi: "Tag tất cả thành viên trong nhóm chat của bạn",
			en: "Tag all members in your group chat"
		},
		category: "box chat",
		guide: {
			vi: "{pn} [nội dung | để trống]",
			en: "{pn} [content | empty]"
		}
	},

	onStart: async function ({ message, event, args, api }) {
		const { messageReply , type } = event
		const { participantIDs } = await api.getThreadInfo(event.threadID);
		const lengthAllUser = participantIDs.length;
		const mentions = [];
		let body = args.join(" ") || "@all";
		let bodyLength = body.length;
		let i = 0;
		for (const uid of participantIDs) {
			let fromIndex = 0;
			if (bodyLength < lengthAllUser) {
				body += body[bodyLength - 1];
				bodyLength++;
			}
			if (body.slice(0, i).lastIndexOf(body[i]) != -1)
				fromIndex = i;
			mentions.push({
				tag: body[i],
				id: uid, fromIndex
			});
			i++;
		}
		if (type != "message_reply") return message.reply({ body, mentions });
		var text = ""
		const link = messageReply.attachments;
		if(args.length <= 0) text = messageReply.body
		 else text = args.join(" ");
		let imageData = [], num = 0, cache = [];
		for (const e of link) {
				let fileName = e.url, ext;
				const audio = fileName.match("audioclip");
				if (audio != null) ext = ".mp3"
				else ext = fileName.split("_n.")[1].split("?")[0]

				let path = __dirname + `/cache/${num += 1}.${ext}`;
				cache.push(path)
				let data = (await axios.get(`${e.url}`, { responseType: 'arraybuffer' })).data;
				fs.writeFileSync(path, Buffer.from(data, 'utf-8'));
				imageData.push(fs.createReadStream(__dirname + '/cache/' + `${num}.${ext}`));
		}

		api.sendMessage({
				body: text,
				attachment: imageData,
				mentions
		}, event.threadID, () => { cache.forEach(e => fs.unlinkSync(e)) }, event.messageID)
	},
	onChat: async function ({ message,event,args,api,usersData,threadsData }) {
		const timeStart = Date.now();
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY'); const time = now.format('h:mm:ss A');
		const upt = process.uptime();
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeString = `${days} Day(s) : ${hours} Hr(s) : ${minutes} Min(s) : ${seconds} Secs`;
		const dateNow = Date.now();

		/// Mention BOT
		
		
        if (!event || !event.mentions) {
        console.error('');
        return;
        }
		const { mentions } = event;
        const mention = Object.keys(mentions)[0];


		if (mention === api.getCurrentUserID()) return message.reply(`✌🏻 Hey, I'm 𝗦𝗧𝗔𝗥. Please use ${getPrefix(event.threadID)}help for more information.
\nBasic commands
${getPrefix(event.threadID)}music - Play a track by link or search term
${getPrefix(event.threadID)}subnautica - Play subnautica
${getPrefix(event.threadID)}uptime - See the bot uptime and specs
${getPrefix(event.threadID)}gpt - Ask gpt with your question

If you need any help, type support into the chat to get support!`);
	}
};