import dotenv from "dotenv";

export class Config {
	private static instance: Config;
	private map: Map<string, string>;
	private constructor() {
		dotenv.config();
		this.map = new Map();
		this.map.set("token", process.env.TOKEN ?? "");
		this.map.set("prefix", process.env.PREFIX ?? "");
	}

	static getInstance() {
		if (!Config.instance) {
			Config.instance = new Config();
		}
		return Config.instance;
	}

	static getValue(key: "token" | "prefix"): string {
		return Config.getInstance().map.get(key) ?? "";
	}
}
