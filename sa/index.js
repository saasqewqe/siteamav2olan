//-------------- TANIMLAMALAR --------------
const Discord = require('discord.js')
const client = new Discord.Client({disableMentions:"everyone",ws: { intents: new Discord.Intents(Discord.Intents.ALL) }})
const efDB = require("efdb")
const db = new efDB({
	databaseName:"ekData",
	databaseFolder:"veriler",
	adapter:"YamlDB"
})
const moment = require("moment");
require("moment-duration-format");
//----------- AYARLAMALAR ------------
client.ayarlar = {
	token: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	gelistirici:["716930725877907466","796363298378350612"],
	oauthSecret: "XXXXXXXXXXXXXXXXXX",
	callbackURL: "http://dash.nullman0.repl.co/callback",
  id:"815521872833413120"
}
var deasync = require('deasync');

function userBul(ID) {
  return deasync(async(_ID, cb) => {
    let output = null;

    try {
      let user = await client.users.fetch(_ID);

      output = { 
        tag: user.tag,
        avatar: user.avatarURL(),
        name:user.username,
        isbot:user.bot,
     };
    } catch(err) { output = {tag:"Bulunamadı#0000",isbot:null,name:"Bulunamadı",avatar:client.user.avatarURL()} }
    
    cb(null, output);
  })(ID);
}

 function kisalt(str) {
  var newstr = "";
  var koyulan = 0;
  if(str.length > 10) {
    dongu: for(var i = 0;i<str.length;i++) {
      const element = str.split("")[i];
      if(i >= 28) { 
        if(koyulan < 3) {
          newstr += " .";
          koyulan++;
        }else {
          break dongu;
        }
        
      }else newstr += element; 
    }
    return newstr;
  }else return str;
}

const zaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

function botista() {
	return {
		serverSize: client.guilds.cache.size,
		userSize:client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
		emojiSize:client.emojis.cache.size.toLocaleString(),
		channelSize:client.channels.cache.size.toLocaleString(),
		uptime:moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")
	}
}
client.db = db
client.stats = botista
client.kisibul = userBul
client.tools = {
	kisalt:kisalt
}
  require("./dash")(client)
client.login("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
