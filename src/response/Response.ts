import { GuildMessage } from "../util/GuildMessage";

export abstract class Response {
	static readonly identifier: string = "invalid-response";

	constructor(readonly message: GuildMessage) {}

	abstract async sendEmbed(): Promise<any>;
}
