const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Japan', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rpc started! check your profile ^^`);

  const r = new Discord.RichPresence()
    .setApplicationId('1208472205432848406')
    .setType('STREAMING')
    .setURL('https://twitch.tv/linkkstabs') //Must be a youtube video link 
    .setState("Kiki's Delivery Service")
    .setName('Jiji')
    .setDetails(`Delivering.. [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1181461047736029206/1229400101278060665/16_7GMbPZgZXhUMHdsfFfkQ2x.png?ex=662f8b11&is=661d1611&hm=83f7dc6080a0fe001230a0b16eb93e3c0283508db6885f649224c4c62aa86a06&=&format=webp&quality=lossless&width=687&height=366') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Kiki') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1181461047736029206/1229400473056837672/AATXAJxwXC-2Py2nBHFJ7l-oB93QeSjqa6YePLXL_ws900-c-k-c0xffffffff-no-rj-mo.png?ex=662f8b69&is=661d1669&hm=a33db242078473d1bd7ea7f068e64c5e782f569fa3583c717917c51f19f1043f&=&format=webp&quality=lossless&width=437&height=437') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Jiji') //Text when you hover the Small image
    

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `となりのトトロ [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
