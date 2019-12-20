import { Client, Message } from "discord.js";

export abstract class Command {
	static readonly identifier: string = "invalid-command";
	readonly identifier = (<typeof Command>this.constructor).identifier;

	static readonly description: string = "Invalid Command";
	readonly description = (<typeof Command>this.constructor).description;

	constructor(readonly client: Client, readonly args: string[], readonly message: Message) {}

	abstract async run(): Promise<any>;
}


