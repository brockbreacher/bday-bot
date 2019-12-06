import { Client } from "discord.js";
import { CommandHandler } from "./CommandHandler"

const client = new Client();

client.on("message", message => {
	CommandHandler.process(message);
});

client.login("");