import { Command } from "../Command";
import { WelcomeResponse } from "../responses/welcome";

export class WelcomeCommand extends Command {
	static readonly identifier = "welcome";
	static readonly description = "I run this whenever i join a guild";

	async run() {
		await this.sendResponse(WelcomeResponse);
	}
}
