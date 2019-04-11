import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public firstSeenDateTime: string;

    // @OneToMany(type => Sighting, )

}