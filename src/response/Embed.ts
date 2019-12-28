import { Client, MessageEmbed, RichEmbed, RichEmbedOptions } from "discord.js";

export class Embed extends RichEmbed {
	constructor(client: Client, data?: RichEmbedOptions | MessageEmbed) {
		super(data);
		this.setFooter("Service provided by Bday-Bot", client.user.displayAvatarURL)
			.setTimestamp();
	}

	setResponseColor(color: "pink"): Embed {
		if (color === "pink") {
			this.setColor(16753919);
		}
		return this;
	}

}