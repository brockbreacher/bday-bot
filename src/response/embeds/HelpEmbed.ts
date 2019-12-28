import { Embed } from "../Embed";
import { Client } from "discord.js";
import { Config } from "../../util/Config";
import { Command } from "../../cmd/Command";

export class HelpEmbed extends Embed {
	constructor(client: Client) {
		super(client);
		this.setTitle("Help and Commands");
		this.setResponseColor("pink");
	}

	addCommand(command: typeof Command): HelpEmbed {
		this.addField(
			`**${Config.getValue("prefix")}${command.identifier}**`,
			command.description);
		return this;
	}
}