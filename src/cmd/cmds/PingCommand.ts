import { Command } from "../Command";

export class PingCommand extends Command {
	static readonly identifier = "ping";

	async run(): Promise<void> {
		await this.message.channel.send("Ping!");
	}
}