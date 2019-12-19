import { Client, Message } from "discord.js";

export abstract class Command {
	static readonly identifier: string = "";
	readonly identifier = (<typeof Command>this.constructor).identifier;

	constructor(readonly client: Client, readonly args: string[], readonly message: Message) {}

	abstract async run(): Promise<any>;
}


