import { Client } from "discord.js";
import { Config } from "./util/Config";
import { ActivityHandler, AnnouncementHandler, CommandHandler } from "./handlers";
import { DatabaseManager } from "./database";
import { Activities } from "./activity/Activities";
import { WelcomeHandler } from "./handlers/WelcomeHandler";

export async function main() {
	await DatabaseManager.getConnection();
	const client = new Client();
	const messageHandler = new CommandHandler(client);
	const welcomeHandler = new WelcomeHandler(client);
	const activityHandler = new ActivityHandler(client);
	const announcementHandler = new AnnouncementHandler(client);

	client.on("message", message => messageHandler.process(message));
	client.on("guildCreate", guild => welcomeHandler.process(guild));
	client.on("ready", () => activityHandler.start(60_000, new Activities(client)));
	client.on("ready", () => announcementHandler.start());

	await client.login(Config.getValue("token"));
}

