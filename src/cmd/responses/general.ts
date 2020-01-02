import { Response } from "../Response"
import { EmbedColor } from "../Embed";

export class InvalidInput extends Response {
	readonly getText = () =>
		"That is not a valid input. Command cancelled";
	readonly getEmbed = () =>
		this.embed("Invalid Input", this.getText(), EmbedColor.RED);
}

export class PromptTimeout extends Response {
	readonly getText = () =>
		"You waited too long. Command cancelled";
	readonly getEmbed = () =>
		this.embed("Prompt Timeout", this.getText(), EmbedColor.RED);
}
