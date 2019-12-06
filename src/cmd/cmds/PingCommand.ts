import { Command } from "../Command";

export class PingCommand extends Command {
	name: string = "ping";

	async run(): Promise<void> {
		await this.message.channel.send("Ping!");
	}
}