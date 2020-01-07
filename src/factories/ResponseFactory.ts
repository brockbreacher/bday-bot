import { GuildMessage } from "../util/Util";
import { ResponseClass, ResponseInterface } from "../cmd/Response";

/**
 * A static factory to help create responses from a Command
 */
export class ResponseFactory {
	constructor(readonly message: GuildMessage) {}

	/**
	 * Instantiates the response. This is only used internally by Command
	 * @param responseClass
	 */
	create<T extends ResponseInterface>(responseClass: ResponseClass<T>): T {
		return new responseClass(this.message.channel);
	}
}
