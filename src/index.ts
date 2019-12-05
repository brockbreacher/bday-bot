import dotenv from "dotenv";
import { BBYClient, getConfig, getPrefix, isActivityType } from "./lib";
import { commands } from "./commands";

dotenv.config();
const config = getConfig(process.env);
const client = new BBYClient(config.prefix, commands);

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	if (isActivityType(config.type)) {
		client.user.setActivity(config.game, { type: config.type })
			.catch(console.error);
	}
});

client.on("message", async message => {
	if (message.author.bot) return;

	const prefixes = [client.prefix, `<@${client.user.id}>`];
	const prefix = getPrefix(message.content, prefixes, false);
	if (!prefix) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift()?.toLowerCase();

	if (!commandName || !client.commands.has(commandName)) return;
	console.log(`Running ${commandName}...`);
	const Command = client.commands.get(commandName);
	await (new Command().run(client, message, args)
		.then(() => console.log(`Ran ${commandName}!`))
		.catch(console.error));
});

client.login(config.token)
	.catch(console.error);
