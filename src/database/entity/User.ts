import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryColumn({ length: 18 })
		// @ts-ignore
	id: string;

	@Column()
		// @ts-ignore
	birthday: Date;
}