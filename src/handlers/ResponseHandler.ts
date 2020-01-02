import { GuildMessage } from "../util/GuildMessage";
import { ResponseClass, ResponseInterface } from "../cmd/Response";


export class ResponseHandler {
	constructor(readonly message: GuildMessage) {}

	create<T extends ResponseInterface>(responseClass: ResponseClass<T>): T {
		return new responseClass(this.message.channel);
	}
}