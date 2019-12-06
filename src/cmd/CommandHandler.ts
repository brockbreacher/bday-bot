import { Client, Message } from "discord.js";
import { CommandFactory } from "./CommandFactory";

export class CommandHandler {
	factory: CommandFactory;
	constructor(readonly client: Client) {
		this.factory = new CommandFactory(client);
	}

	async process(message: Message): Promise<void> {
		if (message.author.bot) return;

		const command = this.factory.create(message);
		if (command === null) return;

		console.log(`Running ${command.name}!`);
		try {
			await command.run();
			console.log(`Ran ${command.name}!`)
		} catch (e) {
			console.log(`Error running ${command.name}: ${e}`);
		}
	}
}