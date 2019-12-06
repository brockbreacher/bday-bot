import { Client, Message } from "discord.js";
import { Config } from "../Config";
import { Command } from "./Command";
import { PingCommand } from "./cmds/PingCommand";

export class CommandFactory {
	constructor(readonly client: Client) {}

	create(message: Message): Command | null {
		const content = message.content;
		const prefix = [Config.getValue("prefix"), `${this.client.user}`].find(x => content.startsWith(x));
		if (!prefix) return null;
		const [command, ...args] = content.slice(prefix.length).trim().split(/ +/);

		switch (command) {
			case "ping":
				return new PingCommand(this.client, args, message);
			default:
				return null;
		}
	}
}