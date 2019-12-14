import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Config } from "../util/Config";
import * as entities from "./entity";

export class DatabaseManager {
	private static instance: DatabaseManager;
	private connection: Promise<Connection>;

	private constructor() {
		this.connection = createConnection({
			type: "postgres",
			host: Config.getValue("db_host"),
			port: parseInt(Config.getValue("db_port"), 10), // parseInt radix
			username: Config.getValue("db_username"),
			password: Config.getValue("db_password"),
			database: Config.getValue("db_database"),
			entities: Object.values(entities),
			synchronize: true,
			logging: false
		});
	}

	public static getInstance() {
		if (!DatabaseManager.instance) {
			DatabaseManager.instance = new DatabaseManager();
		}
		return DatabaseManager.instance;
	}

	public static getConnection(): Promise<Connection> {
		return DatabaseManager.getInstance().connection;
	}
}
