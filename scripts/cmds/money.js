module.exports = {
	config: {
		name: "money",
		aliases: ["mony", "mney"],
		version: "1.1",
		author: "D4XG x Quat",
		countDown: 5,
		role: 2,
    shortDescription: {
      vi: "Moderate user money",
      en: "Moderate user money"
    },
    longDescription: {
      vi: "Moderate user money",
      en: "Moderate user money"
    },
    category: "admin",
    guide: {
      vi: "   {pn} check: Check user money\n   {pn} add: Add money\n   {pn} delete: Delete amount of money\n   {pn} remove: Reset specific user money\n   {pn} set: Set money of a user",
      en: "   {pn} check: Check user money\n   {pn} add: Add money\n   {pn} delete: Delete amount of money\n   {pn} remove: Reset specific user money\n   {pn} set: Set money of a user"
    }
},  
	onStart: async function ({ message, usersData, event,args,role }) {
		var {addMoney:add,getName}=usersData,{reply}=message
		let targetID = event.type === 'message_reply' ? event.messageReply.senderID : Object.keys(event.mentions).length > 0 ? Object.keys(event.mentions)[0] : event.senderID;
		const userMoney = await usersData.getMoney(targetID);
		if(!args[0]){return reply('🖥 Money Panel\n\n  📋 | money check: Check user money\n  ➕ | money add: Add money to specific user\n  ➖ | money delete: Delete money of specific user\n  ✂ | money remove: Reset specific user money\n  ⚙ | money set: Set specific user money\n\n')}
		switch(args[0]){
				case'add':{if(role<2){return reply('[!] Chỉ có ADMIN mới có thể sử dụng lệnh này')} 
									 await add(targetID,parseInt(args[1]));
									 return reply('Successfully added '+args[1]+'SC to '+(await getName(targetID)))}
			  case'delete':{if(role<2){return reply('[!] Chỉ có ADMIN mới có thể sử dụng lệnh này')}
					         await add(targetID,parseInt(-args[1]));
									 return reply('Successfully removed '+args[1]+'SC for '+(await getName(targetID)))}
				case'remove':{if(role<2){return reply('[!] Chỉ có ADMIN mới có thể sử dụng lệnh này')} 
				           await add(targetID,parseInt(-userMoney));
				           return reply('Successfully RESET all money of '+(await getName(targetID)))}
				case'set':{if(role<2){return reply('[!] Chỉ có ADMIN mới có thể sử dụng lệnh này')} 
				 await add(targetID,-userMoney+parseInt(args[1]));
				 return reply('Set '+(await getName(targetID))+' all money to '+args[1])}
				case'check':{return reply((await getName(targetID))+' have '+userMoney+'SC')}
	}
}
}