import { Client } from "discord.js";
import { Activities } from "./Activites";

export class ActivityHandler {
	readonly activities = new Activities(this.client);

	constructor(readonly client: Client) {}

	start(interval: number) {
		this.client.setInterval(() => {
			this.client.user.setActivity(this.activities.next().value)
		}, interval)
	}
}

