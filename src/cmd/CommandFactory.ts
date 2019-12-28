import { Message } from "discord.js";
import { Config } from "../util/Config";
import { Command } from "./Command";
import * as commands from "./cmds";

export class CommandFactory {
	static create(message: Message): Command | null {
		const content = message.content;
		const prefix = [Config.getValue("prefix"), `${message.client.user}`].find(x => content.startsWith(x));
		if (!prefix) return null;

		const [command, ...args] = content.slice(prefix.length).trim().split(/ +/);
		const CommandClass = Object.values(commands).find(x => x.identifier === command);
		if (!CommandClass) return null;

		return new CommandClass(message.client, args, message);
	}
}