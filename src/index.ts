import { Client } from "discord.js";
import { Config } from "./util/Config";
import { ActivityHandler, CommandHandler } from "./handlers/";
import { DatabaseManager } from "./database";

(async () => {
	await DatabaseManager.getConnection();
	const client = new Client();
	const commandHandler = new CommandHandler(client);
	const activityHandler = new ActivityHandler(client);

	client.on("message", async message => {
		await commandHandler.process(message);
	});

	client.on("ready", () => {
		activityHandler.start(5000);
	});

	await client.login(Config.getValue("token"));
})();
