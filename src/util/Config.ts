import dotenv from "dotenv";

type Configs =
	"token" | "prefix" | "db_host" |
	"db_port" | "db_username" |
	"db_password" | "db_database";

export class Config {
	private static instance: Config;
	private readonly map: Map<string, string>;

	private constructor() {
		dotenv.config();
		const {
			TOKEN, PREFIX, DB_HOST,
			DB_PORT, DB_USERNAME,
			DB_PASSWORD, DB_DATABASE
		} = process.env;
		this.map = new Map([
			["token", TOKEN ?? ""],
			["prefix", PREFIX ?? ""],
			["db_host", DB_HOST ?? ""],
			["db_port", DB_PORT ?? ""],
			["db_username", DB_USERNAME ?? ""],
			["db_password", DB_PASSWORD ?? ""],
			["db_database", DB_DATABASE ?? ""]
		]);
	}

	static getInstance() {
		if (!Config.instance) {
			Config.instance = new Config();
		}
		return Config.instance;
	}

	static getValue(key: Configs): string {
		return Config.getInstance().map.get(key) ?? "";
	}
}
