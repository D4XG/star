const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "maintain",
		aliases: ["mtain", "maintn"],
		version: "1.3",
		author: "D4XG",
		countDown: 0,
		role: 2,
		shortDescription: {
			vi: "Turn on/off BOT Maintain Status",
			en: "Turn on/off BOT Maintain Status"
		},
		longDescription: {
			vi: "Turn on/off BOT Maintain Status",
			en: "Turn on/off BOT Maintain Status"
		},
		category: "owner",
		guide: {
			vi: "   {pn} [on | off]: Chế độ bảo trì"
				+ "\n   {pn} noti [on | off]: Thông báo bảo trì",
			en: "   {pn} [on | off]: Maintain mode"
				+ "\n   {pn} noti [on | off]: Maintain notification"
		}
	},

	langs: {
		vi: {
			turnedOn: "Bot has entered maintenance state",
			turnedOff: "Maintenance mode has been turned off",
			turnedOnNoti: "Notification turned on",
			turnedOffNoti: "Notification turned off" 
      ///Bot is currently under maintenance


		},
		en: {
			turnedOn: "Bot has entered maintenance state",
			turnedOff: "Maintenance mode has been turned off",
			turnedOnNoti: "Notification turned on",
			turnedOffNoti: "Notification turned off"
		}
	},

	onStart: function ({ args, message, getLang }) {
		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "on")
			value = true;
		else if (args[indexGetVal] == "off")
			value = false;
		else
			return message.SyntaxError();

		if (isSetNoti) {
			config.adminOnly.hideNotiMessage = !value;
			message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
		}
		else {
			config.adminOnly.enable = value;
			message.reply(getLang(value ? "turnedOn" : "turnedOff"));
		}

		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};