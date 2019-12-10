import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Guild } from ".";

@Entity()
export class User {
	@PrimaryColumn({ length: 18 })
	id!: string;

	@ManyToOne(() => Guild)
	guild!: Guild;

	@Column()
	birthday!: Date;
}