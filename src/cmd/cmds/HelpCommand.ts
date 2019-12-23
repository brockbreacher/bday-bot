import { RichEmbed } from "discord.js";
import * as commands from "./";
import { Command } from "../Command";
import { Config } from "../../util/Config";

export class HelpCommand extends Command {
	static readonly identifier = "help";
	static readonly description = "Shows you this help page";

	async run() {
		const prefix = Config.getValue("prefix");
		const embed = new RichEmbed()
			.setTitle("Help and Commands")
			.setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL)
			.setColor(16753919)
			.setTimestamp();

		for (const command of Object.values(commands)) {
			embed.addField(`**${prefix}${command.identifier}**`, command.description);
		}
		await this.message.channel.send(embed);
	}
}