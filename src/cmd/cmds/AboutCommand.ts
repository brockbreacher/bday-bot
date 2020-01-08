import { Command } from "../Command";
import { AboutResponse } from "../responses/about";

export class AboutCommand extends Command {
	static readonly identifier = "about";
	static readonly description = "Shows you my about page";

	async run() {
		await this.sendResponse(AboutResponse)
	}
}
