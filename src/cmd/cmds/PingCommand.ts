import { Command } from "../Command";
import { PingSuccess, PingPending } from "../responses/ping";

export class PingCommand extends Command {
	static readonly identifier = "ping";
	static readonly description = "Checks the bot's ping";

	async run() {
		const pendingMessage = await this.sendResponse(PingPending);
		const pingDelay = pendingMessage.createdTimestamp - this.message.createdTimestamp;
		const editedEmbed = this.getResponseContent(PingSuccess, pingDelay);
		await pendingMessage.edit(editedEmbed);
	}
}