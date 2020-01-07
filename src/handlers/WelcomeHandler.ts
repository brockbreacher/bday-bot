import { Client, Guild, TextChannel } from "discord.js";
import { WelcomeCommand } from "../cmd/cmds";
import { GuildMessage } from "../util/Util";

export class WelcomeHandler {
	constructor(readonly client: Client) {}

	async process(guild: Guild) {
		const channel = this.findChannel(guild);
		if (!channel) return;
		await this.sendMessage(channel);
	}


	findChannel(guild: Guild): TextChannel | null {
		const channels =
			[guild.systemChannel,
				guild.channels.find(x => x.name === "general"),
				...guild.channels.filter(x => x.type === "text").values()] as (TextChannel | null)[];
		for (const chan of channels) {
			console.log(chan);
			console.log(chan?.name);
			if (chan?.permissionsFor(guild.me)?.has("SEND_MESSAGES")) return chan;
		}
		return null;
	}

	async sendMessage(channel: TextChannel): Promise<void | null> {
		const message = await channel?.send("Loading welcome command...") as GuildMessage;
		if (!message) return null;
		await new WelcomeCommand(this.client, [], message).run();
		await message.delete();
	}
}
