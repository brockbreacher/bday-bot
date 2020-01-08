import { Command } from "../Command";
import { SupportResponse } from "../responses/support";

export class SupportCommand extends Command {
	static readonly identifier = "support";
	static readonly description = "Link to my support server";

	async run() {
		this.sendResponse(SupportResponse)
	}
}
