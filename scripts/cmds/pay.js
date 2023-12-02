module.exports = {
  config: {
  name: "pay",
  version: "1.0",
  aliases: ["paid"],
  description: "Chuyển tiền cho người dùng",
  author: "D4XG x Quat",
  countDown: 0,
  role: 0,
  category: "user",
    guide: {
    vi: "   {pn} {amount} {tag/id}\n   Reply user message\n   {pn} {amount}",
    en: "   {pn} {amount} {tag/id}\n   Reply user message\n   {pn} {amount}",
      },
  },
  onStart: async function ({ message, event, args,api,usersData }) {
    if((await usersData.getMoney(event.senderID))<0||args[0]>(await usersData.getMoney(event.senderID))){return message.reply('You do not have enough money to make this transaction')}
    if(!parseInt(args[0])){return message.reply('Use pay {amount} {tag/id} or reply to user message and user pay {amount}')}
  let targetID = event.type === 'message_reply' ? event.messageReply.senderID : Object.keys(event.mentions).length > 0 ? Object.keys(event.mentions)[0] : event.senderID;
  var {addMoney:add,getName}=usersData
  await add(targetID,parseInt(args[0]))
  await add(event.senderID,parseInt(-args[0]))
  message.reply('Successfully paid '+await getName(targetID)+' '+args[0]+'SC')
  }
}