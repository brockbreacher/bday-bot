import { GuildMessage } from "../util/GuildMessage";
import * as responses from "./responses";


export class ResponseFactory {
	static create(response: string, message: GuildMessage) {
		const ResponseClass =
			Object.values(responses)
				.find(x => x.identifier === response);

		if (!ResponseClass) throw new Error(`Invalid response ${response}`);
		return new ResponseClass(message);
	}
}