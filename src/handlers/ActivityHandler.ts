import { Client } from "discord.js";
import { ThunkedIterator } from "../util/ThunkedIterator";

export class ActivityHandler {
	constructor(readonly client: Client, readonly activities: ThunkedIterator<string>) {}

	start(interval: number) {
		this.client.setInterval(() => {
			this.client.user.setActivity(this.activities.next().value, { type: "WATCHING" });
		}, interval);
	}
}
