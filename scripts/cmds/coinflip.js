module.exports = {
  config: {
    name: "coinflip",
    aliases: ["cf"],
    version: "1.1",
    author: "D4XG x Quat",
    countDown: 10,
    category: "user",
    role: 0,
},  
  onStart: async function ({ message:m, usersData:u, event,args:a}) {
  var xu=['head','tail'][Math.floor(Math.random() * ['tail','headh'].length)]
  ,money=await u.getMoney(event.senderID)
  ,mon=a[0]=='all'?money:a[0],{addMoney:a}=u,name=await u.getName(event.senderID)
  if(mon>money){return m.reply('You dont have enough SC to play!')}
  try{
  if(xu=='head'){await a(event.senderID, parseFloat(mon));return m.reply(name+' spent '+mon+' and chose heads\nThe coin spins... HEAD and you won '+mon*2)}
  if(xu=='tail'){await a(event.senderID, parseFloat(-mon));return m.reply(name+ ' spent '+mon+' and chose heads\nThe coin spins... TAIL and you lost it all... :c')}
  } catch (e){m.reply('Error!')}
  }}