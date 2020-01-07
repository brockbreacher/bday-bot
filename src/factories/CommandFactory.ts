import { GuildMessage } from "../util/Util";
import { Command } from "../cmd/Command";
import { Config } from "../util/Config";
import * as commands from "../cmd/cmds";

/**
 * A static factory for parsing and creating commands
 */
export class CommandFactory {
	/**
	 * Parses a message and returns a Command instance if possible
	 * @param message
	 */
	static create(message: GuildMessage): Command | null {
		const content = message.content;
		const prefix = [Config.getValue("prefix"), `${message.client.user}`].find(x => content.startsWith(x));
		if (!prefix) return null;

		const [command, ...args] = content.slice(prefix.length).trim().split(/ +/);
		const CommandClass = Object.values(commands).find(x => x.identifier === command);
		if (!CommandClass) return null;

		return new CommandClass(message.client, args, message);
	}
}
