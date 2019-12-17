import { Client, Message } from "discord.js";
import { CommandFactory } from "../cmd/CommandFactory";

export class CommandHandler {
	factory = new CommandFactory(this.client);

	constructor(readonly client: Client) {}

	async process(message: Message): Promise<void> {
		if (message.author.bot) return;

		const command = this.factory.create(message);
		if (command === null) return;

		console.log(`Running ${command.identifier}!`);
		try {
			await command.run();
			console.log(`Ran ${command.identifier}!`);
		} catch (e) {
			console.log(`Error running ${command.identifier}: ${e}`);
		}
	}
}