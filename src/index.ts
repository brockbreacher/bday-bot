import { Client } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { Config } from "./Config";

const client = new Client();

client.on("message", message => {
	CommandHandler.process(message);
});

client.login(Config.getValue("token"));