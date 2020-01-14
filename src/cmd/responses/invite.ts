import { Response } from "../Response";
import { EmbedColor } from "../Embed";

export class InviteResponse extends Response {
	readonly getText = () =>
		`Invite me at https://discordapp.com/oauth2/authorize?client_id=641719289212174347&permissions=0&scope=bot`;
	readonly getEmbed = () =>
		this.embed("Invite", this.getText(), EmbedColor.PINK);
}
