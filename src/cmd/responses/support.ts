import { Response } from "../Response";
import { EmbedColor } from "../Embed";

export class SupportResponse extends Response {
	readonly getText = () =>
		`Join our support server: https://discord.gg/MKxua5W`;
	readonly getEmbed = () =>
		this.embed("Support Server", this.getText(), EmbedColor.PINK);
}
