import { Client } from "discord.js";
import { Config } from "./Config";
import { CommandHandler } from "./cmd/CommandHandler";
import { ActivityHandler } from "./activity/ActivityHandler";

const client = new Client();
const commandHandler = new CommandHandler(client);
const activityHandler = new ActivityHandler(client);

client.on("message", async message => {
	await commandHandler.process(message);
});

client.on("ready", () => {
	activityHandler.start(5000);
});

client.login(Config.getValue("token"));