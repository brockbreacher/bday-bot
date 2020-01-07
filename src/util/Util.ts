import { Message, TextChannel } from "discord.js";

/**
 * A simple date validation function.
 * @param day
 * @param month
 * @param year
 */
export function validateDate(day: number, month: number, year: number) {
	// Validate years
	if (year < 0) return false;

	// Validate months
	if (month < 1 || month > 12) return false;

	// Validate days
	if (day < 1) return false;

	//  31 vs 30 day months
	if ([1, 3, 5, 7, 8, 10, 12].includes(month))
		if (day > 31) return false;

	if ([4, 6, 9, 11].includes(month))
		if (day > 30) return false;

	// February and leap year stuff
	if (year % 4 === 0) {

		if (day > 29) return false;
	} else {
		if (day > 28) return false;
	}
	return true;
}

/**
 * A message that is guaranteed to be sent in a [Guild TextChannel](https://discord.js.org/#/docs/main/stable/class/TextChannel)
 **/
export interface GuildMessage extends Message {
	channel: TextChannel;
}

/**
 * A type guard for a GuildMessage
 * @param message
 */
export function isGuildMessage(message: Message): message is GuildMessage {
	return message.channel.type === "text";
}
