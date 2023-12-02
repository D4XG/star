
module.exports = {
	config: {
		name: "shop",
		aliases: ["shop"],
		version: "2.3",
		author: "BraSL",
		countDown: 0,
		role: 0,
		shortDescription: '',
		longDescription: '',
		category: "shop",
		guide: ''
	},

	onStart: async function({ message, args, commandName, event, usersData }) {
		message.reply('1. nitro (817382SC)\n\nVui lòng reply stt để mua vật phẩm',(err,info) =>{
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID,
				type: "buy"
			})
		})
	},
	onReply: async function ({ message, args, commandName, event, Reply ,usersData, api}) {
		if (Reply.author != event.senderID) return;
		 message.unsend(Reply.messageID)
		switch (Reply.type) {
			case "buy": {
				const money = await usersData.get(event.senderID, 'money')
				if (money < 817382) return message.reply('Số dư của bạn không đủ để hoàn thành giao dịch này!')
				message.reply("Đang xử lý giao dịch của bạn...")
				setTimeout(async function (){
					//await api.addUserToGroup(Reply.author, "id nhóm nitro"); // ghi ID nhóm vào đây
					message.reply("Đã mua thành công!\nVui lòng check tin nhắn nhóm hỗ trợ nitro.")
				},2000)
			}
		}
	}
};