import { Client } from "discord.js";
import { Activities } from "../activity/Activities";

export class ActivityHandler {
	readonly activities = new Activities(this.client);

	constructor(readonly client: Client) {}

	start(interval: number) {
		this.client.setInterval(() => {
			this.client.user.setActivity(this.activities.next().value, { type: "WATCHING" });
		}, interval);
	}
}
