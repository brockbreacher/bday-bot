import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Config } from "../util/Config";
import { User } from "./entity/User";

export class Database {
	private static instance: Database;
	private connection: Promise<Connection>;

	private constructor() {
		this.connection = createConnection({
			type: "postgres",
			host: Config.getValue("db_host"),
			port: parseInt(Config.getValue("db_port")),
			username: Config.getValue("db_username"),
			password: Config.getValue("db_password"),
			database: Config.getValue("db_database"),
			entities: [
				User
			],
			synchronize: true,
			logging: false
		});
	}

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public static getConnection(): Promise<Connection> {
		return Database.getInstance().connection;
	}
}