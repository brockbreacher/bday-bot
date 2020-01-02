import { Response } from "../Response";
import { EmbedColor } from "../Embed";

export class InvalidPermissions extends Response {
	readonly getText = () =>
		"You need `Manage Server` permissions to run this command";
	readonly getEmbed = () =>
		this.embed("Invalid Permissions", this.getText(), EmbedColor.RED);
}

export class SetupPrompt extends Response {
	readonly getText = () =>
		`Please enter the channel that you would like me to announce birthdays in.\ne.g. ${this.channel} or the channel id: \`${this.channel.id}\``;
	readonly getEmbed = () =>
		this.embed("Setting Announcement Channel...", this.getText(), EmbedColor.ORANGE);
}

export class SetupSuccess extends Response {
	readonly getText = () =>
		`This server has been setup successfully"`;
	readonly getEmbed = () =>
		this.embed("Server Set Up Successfully", this.getText(), EmbedColor.GREEN);
}