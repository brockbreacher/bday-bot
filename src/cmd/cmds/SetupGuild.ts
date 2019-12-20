import { Command } from "../Command";
import { User as DiscordUser, Message, RichEmbed, TextChannel } from "discord.js";
import { Guild } from "../../database/entity";
import { getRepository } from "typeorm";

export class SetupGuild extends Command {
	static readonly identifier = "setupguild";

	async run() {
		const repository = getRepository(Guild);

		if (!this.message.member.hasPermission("MANAGE_GUILD")) {
			const errorEmbed = new RichEmbed().setTitle("Invalid Permissions").setDescription("You need `Manage Server` permissions to run this command").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(1403525).setTimestamp();
			return this.message.channel.send(errorEmbed);
		}

		const embed = new RichEmbed().setTitle("Announcement Channel").setDescription(`Please enter the channel that you would like me to announce birthdays in.\ne.g. ${this.message.channel} or the channel id: \`${this.message.channel.id}\``).setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(16753920).setTimestamp();
		const input = await this.promptMessage(embed, this.message.channel as TextChannel, this.message.author);
		if (!input) {
			const errorEmbed = new RichEmbed().setTitle("Prompt timeout").setDescription("You waited too long. Command cancelled!").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(14035250).setTimestamp();
			return this.message.channel.send(errorEmbed);
		}

		const channelId = this.parseInput(input);
		if (!channelId) {
			const embed = new RichEmbed().setTitle("Invalid Channel").setDescription("That is not a valid channel in this server.").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(14035250).setTimestamp();
			return this.message.channel.send(embed);
		}

		const guild = new Guild();
		guild.id = this.message.guild.id;
		guild.announcementChannel = channelId;
		await repository.save(guild);
		const successEmbed = new RichEmbed().setTitle("Guild Set Up Sucessfully").setDescription("This guild has been set up successfully").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(58390).setTimestamp();
		await this.message.channel.send(successEmbed);
	}

	private async promptMessage(content: string | RichEmbed, channel: TextChannel, user: DiscordUser) {
		await channel.send(content);
		const filter = (m: Message) => m.author.id === user.id;
		const responses = await channel.awaitMessages(filter, { max: 1, time: 30_000 });
		if (!responses.size) return null;
		return responses.first().content;
	}

	private parseInput(input: string) {
		const channelId = input.match(/(\d{18})/)?.[1];

		if (!channelId || !this.message.guild.channels.has(channelId)) return null;
		return channelId;
	}
}