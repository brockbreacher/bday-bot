import { User } from "../entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	findByBirthday(day: number, month: number) {
		return this.createQueryBuilder("user")
			.where("EXTRACT(DAY FROM :date)", { day, month })
			.getMany();
	}
}
