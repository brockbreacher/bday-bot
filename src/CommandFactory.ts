import { Client, Message } from "discord.js";
import { Config } from "./Config";
import { Command, PingCommand } from "./Command";

export class CommandFactory {
	constructor(readonly client: Client) {}

	create(message: Message): Command | null {
		const prefix = Config.getValue("prefix");
		if (!message.content.startsWith(prefix)) return null;
		const [command, ...args] = message.content.slice(prefix.length).split(/ +/);

		switch (command) {
			case "ping":
				return new PingCommand(this.client, args, message);
			default:
				return null;
		}
	}
}