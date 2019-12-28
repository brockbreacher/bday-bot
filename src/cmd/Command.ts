import { Client } from "discord.js";
import { GuildMessage } from "../util/GuildMessage";
import { ResponseFactory } from "../response/ResponseFactory";

export abstract class Command {
	static readonly identifier: string = "invalid-command";
	static readonly description: string = "Invalid Command";

	get identifier() { return (this.constructor as typeof Command).identifier };
	get description() { return (this.constructor as typeof Command).description }

	constructor(readonly client: Client, readonly args: string[], readonly message: GuildMessage) {}

	abstract async run(): Promise<any>;

	async respond(type: string) {
		const hasEmbedPerms = this.message.channel.memberPermissions(this.client.user)?.has("EMBED_LINKS");
		if (!hasEmbedPerms) return this.message.reply("I need `Embed Links` permission to run commands");

		const response = ResponseFactory.create(type, this.message);
		await response.sendEmbed();
	}
}


