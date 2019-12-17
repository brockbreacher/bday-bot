import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryColumn({ length: 18 })
	id!: string;

	@Column()
	birthday!: Date;
}