import { Client, Collection, Message, User } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { isGuildMessage } from "../util/Util";

export class MessageHandler {
	userLock = new Collection<string, User>();

	constructor(readonly client: Client) {}

	async process(message: Message): Promise<void> {
		if (message.author.bot) return;
		if (!isGuildMessage(message)) return;
		if (this.userLock.has(message.author.id)) return;

		const command = CommandHandler.create(message);
		if (!command) return;

		this.userLock.set(message.author.id, message.author);
		console.log(`[${message.author.id}] Running ${command.identifier}!`);
		try {
			await command.run();
			console.log(`[${message.author.id}] Ran ${command.identifier}!`);
		} catch (e) {
			console.log(`[${message.author.id}] Error running ${command.identifier}: ${e.stack}`);
		}
		this.userLock.delete(message.author.id);
	}
}