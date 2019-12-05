import { ActivityType, Client, ClientOptions, Message } from "discord.js";
import ProcessEnv = NodeJS.ProcessEnv;

interface Config {
	token: string,
	prefix: string,
	type: string,
	game: string
}

export const getConfig = ({ TOKEN,
	                        PREFIX,
	                        TYPE,
	                        GAME }: ProcessEnv): Config => {
	if (TOKEN && PREFIX && TYPE && GAME) return { token: TOKEN, prefix: PREFIX, type: TYPE, game: GAME };
	console.error("Please fill out the dotenv file before starting the bot");
	process.exit(1);
};

/**
 * Finds and returns the prefix from the message if applicable
 * @param str { string }
 * @param prefixes { string[] }
 * @param caseSensitive { boolean }
 */

export const getPrefix = (str: string, prefixes: string[], caseSensitive: boolean) => {
	if (caseSensitive) {
		return prefixes.find(prefix => str.startsWith(prefix));
	} else {
		return prefixes.find(prefix => str.toLowerCase().startsWith(prefix.toLowerCase()));
	}
};

/**
 * Type guard to check if a string is a valid ActivityType
 * @param str { string }
 */
export const isActivityType = (str: string): str is ActivityType => {
	return ["PLAYING", "STREAMING", "LISTENING", "WATCHING"].some(x => str === x);
};

/**
 * Custom discord client based off discord.js client
 */
export class BBYClient extends Client {
	prefix: string;
	commands: Map<string, any>;
	constructor(prefix: string, commands: Map<string, any>, options?: ClientOptions) {
		super(options);
		this.prefix = prefix;
		this.commands = commands;
	}
}

/**
 * A BBYClient command
 */
export interface Command {
	run(client: BBYClient, message: Message, args: string[]): Promise<void>;
}
