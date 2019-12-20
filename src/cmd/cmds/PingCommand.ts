import { Message, RichEmbed } from "discord.js";
import { Command } from "../Command";

export class PingCommand extends Command {
	static readonly identifier = "ping";

	async run() {
		const embed = new RichEmbed().setTitle("Ping").setDescription("Pinging server...").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(16753920).setTimestamp();
		const newMessage = await this.message.channel.send(embed) as Message;

		const pingDelay = newMessage.createdTimestamp - this.message.createdTimestamp;
		console.log(pingDelay);
		const editedEmbed = new RichEmbed().setTitle("Pong!").setDescription(`Ping: \`${pingDelay}ms\``).setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(58390).setTimestamp();
		await newMessage.edit(editedEmbed);
	}
}