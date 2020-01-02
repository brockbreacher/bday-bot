import { Command } from "../Command";
import { HelpResponse } from "../responses/help"

export class HelpCommand extends Command {
	static readonly identifier = "help";
	static readonly description = "Shows you this help page";

	async run() {
		await this.sendResponse(HelpResponse);
	}
}
