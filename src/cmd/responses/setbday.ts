import { Response } from "../Response";
import { EmbedColor } from "../Embed";

export class BdayPrompt extends Response {
	readonly getText = () =>
		"Please enter your birthday below in `DD/MM/YYYY` format:\ne.g. `12/03/2004` <- 12th of March 2004";
	readonly getEmbed = () =>
		this.embed("Setting Birthday...", this.getText(), EmbedColor.ORANGE);
}

export class BdaySuccess extends Response {
	readonly getText = (dateString: string) =>
		`Your birthday has been set to ${dateString}`;
	readonly getEmbed = (dateString: string) =>
		this.embed("Birthday Set Successfully", this.getText(dateString), EmbedColor.GREEN);
}


