import { Command } from "../Command";
import * as commands from "./";

export class HelpCommand extends Command {
	static readonly identifier = "help";

	async run() {
		const commandNames = Object.values(commands).map(x => x.identifier);
		await this.message.channel.send(`Here are my commands: ${commandNames.map(x => `\`${x}\``).join(", ")}.`);
	}
}