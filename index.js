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
    timeZone: 'Asia/Kolkata', //https://www.zeitverschiebung.net/en/ and find your city and enter here
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
    .setState('ドリーム ')
    .setName('楽しんで')
    .setDetails(`となりのトトロ [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1181126458744242206/1209548911115636776/giphy.gif?ex=65e75334&is=65d4de34&hm=1b0dd53d29217a98dcf6415e28ca93c80b47f93f6a39d1168640984010c97a01&=') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Totoro') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1181126458744242206/1209548911786594345/giphy_1.gif?ex=65e75334&is=65d4de34&hm=4a1616086a89747daaa343271ada6d04f39dfddde3a1f631d7402e87e3c9aed7&=') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Mei') //Text when you hover the Small image
    .addButton('Carrd', 'https://linkkstabs.carrd.co')

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
