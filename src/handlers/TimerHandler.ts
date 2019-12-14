import { Client } from "discord.js";
import { AnnouncementHandler } from ".";

export class TimerHandler {
	private readonly announcementHandler = new AnnouncementHandler(this.client);

	constructor(readonly client: Client) {}

	start(time: Date) {
		setTimeout(() => this.announcementHandler.announce(), time.getTime() - Date.now())
	}
}