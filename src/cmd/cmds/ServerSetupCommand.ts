import { getRepository } from "typeorm";
import { Command } from "../Command";
import { Guild } from "../../database/entity";

import { InvalidInput, PromptTimeout } from "../responses/general";
import { InvalidPermissions, SetupPrompt, SetupSuccess } from "../responses/serversetup";

export class ServerSetupCommand extends Command {
	static readonly identifier = "serversetup";
	static readonly description = "Set up this server for Bday-Bot";

	async run() {
		const repository = getRepository(Guild);

		if (!this.message.member.hasPermission("MANAGE_GUILD")) {
			this.sendResponse(InvalidPermissions);
		}

		let input = this.args[1] || await this.promptResponse(SetupPrompt);
		if (!input) return this.sendResponse(PromptTimeout);

		const channelId = this.parseInput(input);
		if (!channelId) return this.sendResponse(InvalidInput);

		const guild = Guild.create({
			id: this.message.guild.id,
			announcementChannel: channelId
		});
		await repository.save(guild);

		await this.sendResponse(SetupSuccess);
	}

	private parseInput(input: string) {
		const channelId = input.match(/(\d{18})/)?.[1];

		if (!channelId || !this.message.guild.channels.has(channelId)) return null;
		return channelId;
	}
}