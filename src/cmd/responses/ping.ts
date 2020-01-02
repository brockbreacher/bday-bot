import { Response } from "../Response";
import { EmbedColor } from "../Embed";

export class PingPending extends Response {
	readonly getText = () => "Pinging...";
	readonly getEmbed = () =>
		this.embed("Ping", this.getText(), EmbedColor.ORANGE);
}

export class PingSuccess extends Response {
	readonly getText = (ping: number) =>
		`Ping: \`${ping}\`ms`;
	readonly getEmbed = (ping: number) =>
		this.embed("Pong!", this.getText(ping), EmbedColor.GREEN);
}