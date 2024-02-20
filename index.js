const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime(null) { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: '', //https://www.zeitverschiebung.net/en/ and find your city and enter here
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
    .setState('Minecraft')
    .setName('Minecraft')
    .setDetails(`SKLauncher [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1181126458744242206/1209352071103512586/logo.png?ex=65e69be2&is=65d426e2&hm=989cb8526348de2e9d8fdc00d4fd77047d7829ea7c96864c56cd61e8fa4496fe&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('SKLauncher') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1181126458744242206/1209352070877159544/skinmc-avatar.png?ex=65e69be2&is=65d426e2&hm=03e1a29414709b98eceda681b6a078d2e58c0f5814ffa6f359bf5dfdfa30486d&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('LinkkStabs') //Text when you hover the Small image
    .addButton('Carrd', 'https://linkkstabs.carrd.co')

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `SKLauncher [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
