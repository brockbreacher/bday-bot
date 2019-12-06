import { Client } from "discord.js";
import { CommandHandler } from "./cmd/CommandHandler";
import { Config } from "./Config";

const client = new Client();
const handler = new CommandHandler(client);

client.on("message", async message => {
	await handler.process(message);
});

client.login(Config.getValue("token"));