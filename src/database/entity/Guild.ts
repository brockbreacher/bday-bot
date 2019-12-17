import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Guild {
	@PrimaryColumn({ length: 18 })
	id!: string;

	@Column()
	prefix!: string;

	@Column({ length: 18, nullable: true })
	announcementChannel!: string;
}