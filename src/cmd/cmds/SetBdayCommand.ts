import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../database/repository";
import { User } from "../../database/entity";

import { Command } from "../Command";
import { validateDate } from "../../util/Util"
import { InvalidInput, PromptTimeout } from "../responses/general";
import { BdayPrompt, BdaySuccess } from "../responses/setbday";

export class SetBdayCommand extends Command {
	static readonly identifier = "setbirthday";
	static readonly description = "Allows you to set your birthday";

	async run() {
		const userRepository = getCustomRepository(UserRepository);

		let input = this.args[0] || await this.promptResponse(BdayPrompt);
		if (!input) return this.sendResponse(PromptTimeout);

		const dateArray = this.parseInput(input);
		if (!dateArray) return this.sendResponse(InvalidInput);

		const [day, month, year] = dateArray;
		const user = User.create({
			id: this.message.author.id,
			birthday: new Date(year, month -1, day) // month is zero-indexed
		});
		await userRepository.save(user);

		const dateString = user.birthday.toLocaleDateString("en-US", {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		await this.sendResponse(BdaySuccess, dateString);
	}

	private parseInput(input: string) {
		const dateArray = input
			.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
			?.slice(1, 4)
			.map(x => parseInt(x, 10));

		if (!dateArray) return null;
		return validateDate(...dateArray as [number, number, number]) ? dateArray : null;
	}
}

