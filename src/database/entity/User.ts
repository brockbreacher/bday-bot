import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryColumn({ length: 18 })
	id!: string;

	@Column()
	birthday!: Date;

	static create({ id, birthday }: { id: string, birthday: Date }) {
		const user = new User();
		user.id = id;
		user.birthday = birthday;
		return user;
	}
}