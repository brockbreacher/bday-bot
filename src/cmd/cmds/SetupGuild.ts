import { Command } from "../Command";
import { Message } from "discord.js";
import { Guild } from "../../database/entity";
import { getRepository } from "typeorm";

export class SetupGuild extends Command {
	static readonly identifier = "setupguild";

	async run() {
		const repository = getRepository(Guild);

		if (!this.message.member.hasPermission("MANAGE_GUILD")) {
			return void await this.message.reply("you need to have the `MANAGE_GUILD` permission to run this command.");
		}

		await this.message.channel.send("What channel would you like me to announce in?");
		const filter = (m: Message) => m.author.id === this.message.author.id;
		const responses = await this.message.channel.awaitMessages(filter, { max: 1, time: 30000 });
		if (!responses.size) return void await this.message.reply("command cancelled.");
		const input = responses.first().content;

		const channelId = input.match(/(\d{18})/)?.[1];
		if (!channelId || !this.message.guild.channels.has(channelId)) return void await this.message.reply("invalid channel.");

		const guild = new Guild();
		guild.id = this.message.guild.id;
		guild.announcementChannel = channelId;
		await repository.save(guild);
		await this.message.channel.send("This guild has been set up successfully.");

	}
}