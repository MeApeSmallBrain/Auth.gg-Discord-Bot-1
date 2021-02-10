const Settings = require("../Settings.json")
const req = require("request");
const discord = require("discord.js");
module.exports.run = (bot, message, args)=>
{
    var ok = message.member.guild.roles.cache.find(lol => lol.id == Settings.supportrole)
    if(!ok) return message.reply(":x: | Setup Support Role");
    var perms = message.member.roles.cache.get(Settings.supportrole);
    if(!perms) return message.reply(":x: | You Don't Have Access To Use This Command");
    var username = args[0];
    if(!username) return message.reply(":x: | Mention Username");
    var password = args[1];
    if(!password) return message.reply(":x: | Mention Password");
    try{
    req({
        uri: `https://developers.auth.gg/USERS/?type=changepw&authorization=${Settings.authkey}&user=${username}&password=${password}`,
        method: "GET"
    },function(error, response, data)
    {
var lol = JSON.parse(data)["info"];
switch(lol)
{
case "No application found":
message.reply(`:x: | Invalid Auth Key!`)
break;
case "No user found":
message.reply(`:x: | Couldn't Find That User!`)
break;
case "Password has been updated":
message.reply(`:white_check_mark: | Done!`)
break;
}
});
}
catch(e)
{
return message.reply(`:x: | ${e}`)
}
};

exports.help = {
    name: "cpass",
    aliases: ['changepass'],
    desc: "Change Someones Password"
  }
