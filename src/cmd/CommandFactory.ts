import { Client, Message } from "discord.js";
import { Config } from "../Config";
import { Command } from "./Command";
import * as commands from "./cmds";

export class CommandFactory {
	constructor(readonly client: Client) {}

	create(message: Message): Command | null {
		const content = message.content;
		const prefix = [Config.getValue("prefix"), `${this.client.user}`].find(x => content.startsWith(x));
		if (!prefix) return null;

		const [command, ...args] = content.slice(prefix.length).trim().split(/ +/);
		console.log(command);
		console.log(Object.values(commands).map(x => x.name));

		const CommandClass = Object.values(commands).find(x => x.identifier === command);
		if (!CommandClass) return null;

		return new CommandClass(this.client, args, message);

	}
}