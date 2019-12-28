import { Client, Message } from "discord.js";

export abstract class Command {
	static readonly identifier: string = "invalid-command";
	static readonly description: string = "Invalid Command";

	get identifier() { return (this.constructor as typeof Command).identifier };
	get description() { return (this.constructor as typeof Command).description }

	constructor(readonly client: Client, readonly args: string[], readonly message: Message) {}

	abstract async run(): Promise<any>;
}


