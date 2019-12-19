import { Command } from "../Command";

export class PingCommand extends Command {
	static readonly identifier = "ping";

	async run() {
		await this.message.channel.send("Ping!");
	}
}