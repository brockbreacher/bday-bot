import { Message, TextChannel } from "discord.js";

export interface GuildMessage extends Message {
	channel: TextChannel;
}
