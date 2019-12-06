import { Client, Message } from "discord.js";

export abstract class Command {
	name: string = "";

	abstract async run(client: Client): Promise<void>;
}


export class PingCommand extends Command {
	name: string = "ping";

	constructor(readonly args: string[], readonly message: Message) {
		super();
	}

	async run(client: Client): Promise<void> {
		await this.message.channel.send("Ping!");
	}
}
