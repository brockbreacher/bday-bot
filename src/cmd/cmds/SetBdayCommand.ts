import { getCustomRepository } from "typeorm";
import { Message, RichEmbed, TextChannel, User as DiscordUser } from "discord.js";
import { Command } from "../Command";
import { UserRepository } from "../../database/repository";
import { User } from "../../database/entity";
import { validateDate } from "../../util/Util"

export class SetBdayCommand extends Command {
	static readonly identifier = "setbirthday";
	static readonly description = "Allows you to set your birthday";

	async run() {
		const userRepository = getCustomRepository(UserRepository);

		let input: string | null = this.args[0] ?? null;
		if (!input) {
			const promptEmbed = new RichEmbed().setTitle("Setting Birthday...").setDescription("Please enter your birthday below in `DD/MM/YYYY` format:\ne.g. `12/03/2004` <- 12th of March 2004").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(16753920).setTimestamp();
			input = await this.promptMessage(promptEmbed, this.message.channel as TextChannel, this.message.author);
			if (!input) {
				const errorEmbed = new RichEmbed().setTitle("Prompt timeout").setDescription("You waited too long. Command cancelled!").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(14035250).setTimestamp();
				return await this.message.channel.send(errorEmbed);
			}
		}

		const dateArray = this.parseInput(input);
		if (!dateArray) {
			const errorEmbed = new RichEmbed().setTitle("Invalid input").setDescription("That was not a valid date in `DD/MM/YYYY` format, Command cancelled!").setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(14035250).setTimestamp();
			return this.message.channel.send(errorEmbed);
		}
		const [day, month, year] = dateArray;

		const birthday = new Date(year, month - 1, day);
		const user = User.create({
			id: this.message.author.id,
			birthday // month is zero-indexed
		});
		await userRepository.save(user);

		const dateString = birthday.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
		const embed = new RichEmbed().setTitle("Birthday Set Successfully").setDescription(`Your birthday has been set to ${dateString}.`).setFooter("Service provided by Bday-Bot", this.client.user.displayAvatarURL).setColor(58390).setTimestamp();
		await this.message.channel.send(embed);
	}

	private async promptMessage(content: string | RichEmbed, channel: TextChannel, user: DiscordUser) {
		await channel.send(content);
		const filter = (m: Message) => m.author.id === user.id;
		const responses = await channel.awaitMessages(filter, { max: 1, time: 30_000 });
		if (!responses.size) return null;
		return responses.first().content;
	}

	private parseInput(input: string) {
		const dateArray = input
			.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
			?.slice(1, 4)
			.map(x => parseInt(x, 10));

		if (!dateArray) return null;
		return (validateDate as any)(...dateArray) ? dateArray : null;
	}
}

