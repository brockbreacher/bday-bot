import { Client, TextChannel } from "discord.js";
import { GuildMessage } from "../util/GuildMessage";

export abstract class Command {
	static readonly identifier: string = "invalid-command";
	static readonly description: string = "Invalid Command";

	get identifier() { return (this.constructor as typeof Command).identifier };
	get description() { return (this.constructor as typeof Command).description }

	constructor(readonly client: Client, readonly args: string[], readonly message: GuildMessage) {}

	abstract async run(): Promise<any>;
}


