import { Config } from "./Config";
import { Command, PingCommand } from "./Command";
import { Message } from "discord.js";

export class CommandFactory {
	constructor() {}
	create(message: Message): Command | null {
		const prefix = Config.getValue("prefix");
		if (!message.content.startsWith(prefix)) return null;
		const [command, ...args] = message.content.slice(prefix.length).split(/ +/);

		switch (command) {
			case "ping":
				return new PingCommand(args, message);
			default:
				return null;
		}
	}
}