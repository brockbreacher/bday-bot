import { getCustomRepository } from "typeorm";
import { Message } from "discord.js";
import { Command } from "../Command";
import { UserRepository } from "../../database/repository";
import { User } from "../../database/entity";
import { Util } from "../../util/Util"

export class SetBdayCommand extends Command {
	static readonly identifier = "setbirthday";

	async run(): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);

		let input = this.args[0];
		if (!input) {
			await this.message.channel.send("Please input your birthday below, in the `DD/MM/YYYY` format.");
			const filter = (m: Message) => m.author.id === this.message.author.id;
			const responses = await this.message.channel.awaitMessages(filter, { max: 1, time: 10000 });
			if (!responses.size) return;
			input = responses.first().content;
		}

		const match = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
		if (!match) return void await this.message.reply("the date should be in `DD/MM/YYYY` format.");
		const [day, month, year] = match.slice(1, 4).map(x => parseInt(x));
		if (!Util.validateDate(day, month, year))
			return void await this.message.reply("that is not a valid date in `DD/MM/YYYY` format.");

		let user = new User();
		user.id = this.message.author.id;
		user.birthday = new Date(year, month - 1, day); // month is zero-indexed
		const savedUser = await userRepository.save(user);
		await this.message.channel.send(`Saved user ${savedUser.id}`);
		const results = await userRepository.findByBirthday(day, month);
		await this.message.channel.send(`Others with the same birthday: ${results.map(x => this.client.users.get(x.id))}`)
	}
}

