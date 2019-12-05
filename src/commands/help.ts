import { Message } from "discord.js";
import { BBYClient, Command } from "../lib";

export class HelpCommand implements Command {
	async run(client: BBYClient, message: Message, args: string[]) {
		await message.channel.send("To Be Continued...");
	}
}
