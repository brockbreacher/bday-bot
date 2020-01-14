import { Command } from "../Command";
import { InviteResponse } from "../responses/invite";

export class InviteCommand extends Command {
	static readonly identifier = "invite";
	static readonly description = "Get my invite link";

	async run() {
		this.sendResponse(InviteResponse);
	}
}
