const axios = require('axios');

module.exports = {
	config: {
		name: "kanda",
		aliases: ["kanda"],
		version: "1.0",
		author: "Milan",
		countDown: 5,
		role: 1,
		shortDescription: "get nepali kanda",
		longDescription: "get nepali kanda videos",
		category: "adult",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
			const BASE_URL = `https://apis.samirbadaila24.repl.co/kanda/apikey=samir`;
 message.reply("processing your requests it may take 1 to 5 minutes...."); 
			try {
				let res = await axios.get(BASE_URL)
				let kanda = res.data.url;
				const form = {
					body: `Look At This 🥵`
				};
		 if (kanda)
					form.attachment = await global.utils.getStreamFromURL(kanda);
				message.reply(form); 
			} catch (e) { message.reply(`ðŸ¥º Not Found`)
 console.log(e);
 }

		}
	};