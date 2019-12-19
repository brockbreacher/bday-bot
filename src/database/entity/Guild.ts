import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Guild {
	@PrimaryColumn({ length: 18 })
	id!: string;

	@Column({ length: 18 })
	announcementChannel!: string;
}