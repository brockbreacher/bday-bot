import { Client } from "discord.js";
import { ThunkedIterator } from "../util/ThunkedIterator";

export class ActivityHandler {
	constructor(readonly client: Client) {}

	start(interval: number, activities: ThunkedIterator<string>) {
		this.client.setInterval(() => {
			this.client.user.setActivity(activities.next().value, { type: "WATCHING" });
		}, interval);
	}
}
