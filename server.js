const Discord = require('discord.js')
const superagent = require("superagent");
const client = new Discord.Client()
const settings = require("./settings.json");
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

client.on("ready", () => {
client.user.setActivity(
settings.game,
{ type: settings.type }
)}
);

client.on("message", async message => {
  const prefixes = ["bd!", "BD!", "Bd!", "bD!", "<@+client.user.id+>"];
  let prefix = false;
  for (const thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  if (!prefix) return;
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  try {
    if (message.content == "") throw "empty";
  } catch (err) {
    message.reply("");
  }
  var args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  var command = args.shift().toLowerCase();
  try {
    console.log(`Running ${command}..`);
    let commandFile = require(`./modules/${command}.js`);
    commandFile.run(client, message, args);
    console.log(`Ran ${command}!`);
  } catch (err) {
    console.log(err);
    client.channels.get(settings.consoleID).send("" + err);
  }
});

//Code For Keeping Bot Awake On Glitch.com, remove if not hosting on Glitch
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

client.setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250*1000);
//End Glitch Awake Code

client.login(settings.token);
