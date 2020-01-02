import { Client, MessageEmbed, RichEmbed, RichEmbedOptions } from "discord.js";

export enum EmbedColor {
	GREEN = "#00E416",
	RED = "#D62932",
	PINK = "#FFA4FF",
	ORANGE = "#FFA500",
}

export class Embed extends RichEmbed {
	constructor(client: Client, data?: RichEmbedOptions | MessageEmbed) {
		super(data);
		this.setFooter("Service provided by Bday-Bot", client.user.displayAvatarURL)
			.setTimestamp();
	}
}
