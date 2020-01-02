import { Embed, EmbedColor } from "./Embed";
import { TextChannel } from "discord.js";

export type ResponseClass<T extends ResponseInterface> = new (channel: TextChannel) => T;

export interface ResponseInterface {
	readonly channel: TextChannel;
	getText(...args: any[]): string;
	getEmbed(...args: Parameters<this["getText"]>): Embed;
}

export abstract class Response implements ResponseInterface {
	constructor(readonly channel: TextChannel) {};

	abstract getText(...args: any[]): string;
	abstract getEmbed(...args: Parameters<this["getText"]>): Embed;

	embed(title: string, desc: string, color: EmbedColor) {
		return new Embed(this.channel.client)
			.setTitle(title)
			.setDescription(desc)
			.setColor(color);
	}
}

