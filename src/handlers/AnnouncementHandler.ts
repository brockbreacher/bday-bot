import { Client, TextChannel } from "discord.js";
import { setIntervalAtTime } from "../util/Util";
import { getCustomRepository, getRepository } from "typeorm";
import { Guild } from "../database/entity";
import { UserRepository } from "../database/repository";

export class AnnouncementHandler {
	constructor(readonly client: Client) {}

	async start(time: Date) {
		const userRepository = getCustomRepository(UserRepository);
		const guildRepository = getRepository(Guild);

		setIntervalAtTime(async () => {
			const now = new Date();
			console.log(now.getUTCDate(), now.getUTCMonth());
			const users = await userRepository.findByBirthday(now.getUTCDate(), now.getUTCMonth()+1);

			for (const user of users) {
				const guildIds = this.client.guilds
					.filter(guild => guild.members.has(user.id))
					.map(guild => guild.id);
				const guilds = await guildRepository.findByIds(guildIds);

				for (const guild of guilds) {
					const channel = this.client.channels.get(guild.announcementChannel) as TextChannel;
					await channel.send(`It's <@${user.id}>'s birthday today! Wish them well on their special day.`);
				}
			}
		}, time);
	}
}