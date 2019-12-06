import { Client } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { Config } from "./Config";

const client = new Client();

client.on("message", async message => {
	await CommandHandler.process(message, client);
});

client.login(Config.getValue("token"));