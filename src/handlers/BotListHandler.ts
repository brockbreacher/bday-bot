import DBL from "dblapi.js";
import { Config } from "../util/Config";
import { Client } from "discord.js";

export class BotListHander {
	constructor(readonly client: Client) {}

	start() {
		const token = Config.getValue("dbl_token");
		if (!token) return;
		const dbl = new DBL(token, this.client);

		dbl.on('posted', () => {
			console.log('Server count posted!');
		});

		dbl.on('error', e => {
			console.log(`Oops! ${e}`);
		});
	}
}
