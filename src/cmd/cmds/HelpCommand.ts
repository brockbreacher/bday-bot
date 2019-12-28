import { Command } from "../Command";

export class HelpCommand extends Command {
	static readonly identifier = "help";
	static readonly description = "Shows you this help page";

	async run() {
		await this.respond("help");
	}
}