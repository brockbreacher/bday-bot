import { Client } from "discord.js";
import { ThunkedIterator } from "../util/ThunkedIterator";

export class Activities extends ThunkedIterator<string> {
	constructor(readonly client: Client) {
		super([() => "bd!", () => `in ${this.client.guilds.size} guilds`]);
	}
}
