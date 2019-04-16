import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPersonsFaceEntity1555437645025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying, "firstSeenDateTime" character varying, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "persons_face" ("id" SERIAL NOT NULL, "name" character varying, "image" character varying, "jsonDescriptor" character varying, CONSTRAINT "PK_0103040298254e232d0d8f754a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "persons_face"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
