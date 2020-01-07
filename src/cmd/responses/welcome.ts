import { Response } from "../Response";
import { Config } from "../../util/Config";
import { EmbedColor } from "../Embed";

const prefix = Config.getValue("prefix");

export class WelcomeResponse extends Response {
	readonly getText = () =>
		`Hi, I'm Bday-Bot. I'm a discord bot that announces users birthdays in discord servers.\n\nFor Admin:\nYou can use the \`${prefix}serversetup\` command to setup the announcement channel.\n\nFor Users:\nYou can use the \`${prefix}setbirthday\` command to set your birthday, and I will announce it when it comes around :wink:`;
	readonly getEmbed = () =>
		this.embed("Welcome!", this.getText(), EmbedColor.PINK);
}
