import { Response } from "../Response";
import { EmbedColor } from "../Embed";
import { Config } from "../../util/Config";
import * as cmds from "../cmds";

export class HelpResponse extends Response {
	readonly prefix = Config.getValue("prefix");
	readonly commands = Object.values(cmds);

	readonly getText = () =>
		this.commands.map(com => `\`${this.prefix + com.identifier}\`: ${com.description}`).join("\n");
	readonly getEmbed = () => {
		const embed = this.embed("Help", `My prefix is ${this.prefix}`, EmbedColor.PINK);
		this.commands.forEach(com => embed.addField(`**${com.identifier}**`, com.description, true));
		return embed;
	}
}
