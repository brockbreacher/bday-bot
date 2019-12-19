import { Client } from "discord.js";
import { Config } from "./util/Config";
import { ActivityHandler, AnnouncementHandler, CommandHandler } from "./handlers/";
import { DatabaseManager } from "./database";

(async () => {
	await DatabaseManager.getConnection();
	const client = new Client();
	const commandHandler = new CommandHandler(client);
	const activityHandler = new ActivityHandler(client);
	const announcementHandler = new AnnouncementHandler(client);

	client.on("message", async message => {
		await commandHandler.process(message);
	});

	client.on("ready", () => {
		activityHandler.start(5000);
		announcementHandler.start(new Date(Date.UTC(0,0,0,0,0,0,0)));
	});

	await client.login(Config.getValue("token"));
})();
