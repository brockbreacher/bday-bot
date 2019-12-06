import { Client } from "discord.js";

export class Activities {
	readonly activities = Activities.cycleThunk([() => "bd!", () => `in ${this.client.guilds.size} guilds`]);

	constructor(readonly client: Client) {}

	next(): IteratorResult<string> {
		return this.activities.next();
	}

	private static* cycleThunk<T>(arr: Array<(() => T)>): Generator<T, void, void> {
		while (true) {
			for (const item of arr) {
				yield item();
			}
		}
	};
}