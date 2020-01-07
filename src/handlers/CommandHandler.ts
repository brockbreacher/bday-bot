import { isGuildMessage } from "../util/Util";
import { Client, Message } from "discord.js";
import { CommandFactory } from "../factories/CommandFactory";

export class CommandHandler {
	userLock = new Set<string>();

	constructor(readonly client: Client) {}

	async process(message: Message): Promise<void> {
		if (message.author.bot) return;
		if (!isGuildMessage(message)) return;
		if (this.userLock.has(message.author.id)) return;

		const command = CommandFactory.create(message);
		if (!command) return;

		this.userLock.add(message.author.id);
		console.log(`[${message.author.id}] Running ${command.identifier}!`);
		try {
			await command.run();
			console.log(`[${message.author.id}] Ran ${command.identifier}!`);
		} catch (e) {
			console.log(`[${message.author.id}] Error running ${command.identifier}: ${e.stack}`);
		} finally {
			this.userLock.delete(message.author.id);
		}
	}

}
