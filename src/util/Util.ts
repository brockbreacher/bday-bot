import { Message } from "discord.js";
import { GuildMessage } from "./GuildMessage";

export function setIntervalAtTime(callback: () => void, time: Date) {
	const now = new Date();
	time.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
	if (time.getTime() < now.getTime()) time.setUTCDate(time.getUTCDate() + 1);
	setTimeout(() => {
		setInterval(callback, 24 * 60 * 60 * 1000);
		callback();
	}, time.getTime() - now.getTime());
}

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

export function isGuildMessage(message: Message): message is GuildMessage {
	return message.channel.type === "text";
}
