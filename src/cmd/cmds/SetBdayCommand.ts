import { getCustomRepository } from "typeorm";
import { Message } from "discord.js";
import { Command } from "../Command";
import { UserRepository } from "../../database/repository";
import { User } from "../../database/entity";

export class SetBdayCommand extends Command {
	static readonly identifier = "setbirthday";

	async run(): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		await this.message.channel.send("Please input your birthday in the format `DD/MM/YYYY`");
		const filter = (m: Message) => m.author.id === this.message.author.id;
		const responses = await this.message.channel.awaitMessages(filter, { max: 1, time: 10000 });
		if (!responses.size) return;

		const match = responses.first().content.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
		if (!match) return void await this.message.channel.send("Invalid format");
		console.log(match);
		const [day, month, year] = match.slice(1, 4).map(x => parseInt(x));

		let user = new User();
		user.id = this.message.author.id;
		user.birthday = new Date(year, month - 1, day); // month is zero-indexed
		const savedUser = await userRepository.save(user);
		await this.message.channel.send(`Saved user ${savedUser.id}`);
	}
}

