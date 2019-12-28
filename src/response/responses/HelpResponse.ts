import { Response } from "../Response";
import * as commands from "../../cmd/cmds";
import { HelpEmbed } from "../embeds/HelpEmbed";

export class HelpResponse extends Response {
	static readonly identifier = "help";

	async sendEmbed() {
		const embed = new HelpEmbed(this.message.client);
		Object.values(commands).forEach(com => embed.addCommand(com));
		await this.message.channel.send(embed);
	}
}