import * as fs from "fs";
import { Response } from "../Response";
import { EmbedColor } from "../Embed";

const json = JSON.parse(fs.readFileSync("./package.json", { encoding: "utf8"}));

export class AboutResponse extends Response {
	readonly getText = () =>
		`**Bot Version**: ${json.version}\n**Discord.js Version**: ${json.dependencies["discord.js"]}\n**Github**: https://github.com/Brocks-Hub/bday-bot\n\n**Ideas And Hosting By brockbreacher#1375, Code And Setup By Yamboy1#3959**`;
	readonly getEmbed = () =>
		this.embed("About", this.getText(), EmbedColor.PINK);
}
