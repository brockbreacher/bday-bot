import { Client } from "discord.js";
import { Config } from "./util/Config";
import { ActivityHandler, AnnouncementHandler, MessageHandler } from "./handlers/";
import { DatabaseManager } from "./database";
import { Activities } from "./activity/Activities";

(async () => {
	await DatabaseManager.getConnection();
	const client = new Client();
	const messageHandler = new MessageHandler(client);
	const activityHandler = new ActivityHandler(client, new Activities(client));
	const announcementHandler = new AnnouncementHandler(client);

	client.on("message", async message => {
		await messageHandler.process(message);
	});

	client.on("ready", () => {
		activityHandler.start(60_000);
		announcementHandler.start(new Date(Date.UTC(0,0,0,0,0,0,0)));
	});

	await client.login(Config.getValue("token"));
})();
