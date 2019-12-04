const { Client } = require('discord.js');
const settings = require("./settings.json");

const client = new Client();

client.on("ready", () => {
	client.user.setActivity(settings.game, { type: settings.type });
});

client.on("message", async message => {
	if (message.author.bot) return;
	const prefixes = ["bd!", "<@+client.user.id+>"];
	const prefix = prefixes.find(prefix => message.content.toLowerCase().startsWith(prefix));
	if (!prefix) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();
	try {
		console.log(`Running ${command}..`);
		let commandFile = require(`./modules/${command}.js`);
		commandFile.run(client, message, args);
		console.log(`Ran ${command}!`);
	} catch (err) {
		console.log(err);
		client.channels.get(settings.consoleID).send(`${err}`);
	}
});

client.login(settings.token);
