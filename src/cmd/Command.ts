import { Client, Message, StringResolvable } from "discord.js";
import { ResponseClass, ResponseInterface } from "./Response";
import { ResponseFactory } from "../factories/ResponseFactory";
import { GuildMessage } from "../util/Util";

export abstract class Command {
	get identifier() { return (this.constructor as typeof Command).identifier };
	get description() { return (this.constructor as typeof Command).description };
	static readonly identifier: string = "invalid-command";
	static readonly description: string = "Invalid Command";

	readonly responseFactory = new ResponseFactory(this.message);

	constructor(readonly client: Client, readonly args: string[], readonly message: GuildMessage) {}

	abstract async run(): Promise<any>;

	getResponseContent<T extends ResponseInterface>
	(responseClass: ResponseClass<T>, ...args: Parameters<T["getText"]>): StringResolvable {
		const response = this.responseFactory.create(responseClass);
		if (this.message.channel.permissionsFor(this.client.user)?.has("EMBED_LINKS")) {
			return response.getEmbed(...args);
		} else {
			return response.getText(...args);
		}
	}

	async sendResponse<T extends ResponseInterface>
	(responseClass: ResponseClass<T>, ...args: Parameters<T["getText"]>): Promise<Message> {
		const embed = this.getResponseContent(responseClass, ...args);
		return await this.message.channel.send(embed) as Message;
	}

	async promptResponse<T extends ResponseInterface>
	(responseClass: ResponseClass<T>, ...args: Parameters<T["getText"]>): Promise<string | null> {
		await this.sendResponse(responseClass, ...args);
		const filter = (m: Message) => m.author.id === this.message.author.id;
		const responses = await this.message.channel.awaitMessages(filter, { max: 1, time: 30_000 });
		if (!responses.size) return null;
		return responses.first().content;
	}

}

