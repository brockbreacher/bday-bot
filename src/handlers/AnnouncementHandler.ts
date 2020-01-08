import { Client, RichEmbed, TextChannel } from "discord.js";
import { schedule } from "node-cron";
import { getCustomRepository, getRepository } from "typeorm";
import { Guild } from "../database/entity";
import { UserRepository } from "../database/repository";

export class AnnouncementHandler {
	constructor(readonly client: Client) {}

	async start() {
		const userRepository = getCustomRepository(UserRepository);
		const guildRepository = getRepository(Guild);

		schedule("0 0 0 * * *", async ()=> {
			const now = new Date();
			const users = await userRepository.findByBirthday(now.getUTCDate(), now.getUTCMonth() + 1);

			for (const user of users) {
				const guildIds = this.client.guilds
					.filter(guild => guild.members.has(user.id))
					.map(guild => guild.id);
				const guilds = await guildRepository.findByIds(guildIds);

				for (const guild of guilds) {
					const channel = this.client.channels.get(guild.announcementChannel) as TextChannel;
					const embed = new RichEmbed().setTitle("Happy Birthday").setDescription(`\u{1F389} \u{1F389} It's <@${user.id}>'s birthday today \u{1F389} \u{1F389}\nWish them well on this special day!`).setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(16753919).setTimestamp();
					await channel.send(embed);
				}
			}
		}, { timezone: "Etc/UTC" });
	}
}
