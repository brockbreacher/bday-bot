import { Client, Message } from "discord.js";
import { CommandFactory } from "./CommandFactory";

export class CommandHandler {
	public static async process(message: Message, client: Client): Promise<void> {
		if (message.author.bot) return;

		const commandFactory = new CommandFactory();
		const command = commandFactory.create(message);
		if (command === null) return;

		console.log(`Running ${command.name}!`);
		try {
			await command.run(client);
			console.log(`Ran ${command.name}!`)
		} catch (e) {
			console.log(`Error running ${command.name}: ${e}`);
		}
	}
}