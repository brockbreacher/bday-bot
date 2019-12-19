import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Guild {
	@PrimaryColumn({ length: 18 })
	id!: string;

	@Column({ length: 18 })
	announcementChannel!: string;

	static create({id, announcementChannel}: { id: string, announcementChannel: string }) {
		const guild = new Guild();
		guild.id = id;
		guild.announcementChannel = announcementChannel;
		return guild;
	}
}