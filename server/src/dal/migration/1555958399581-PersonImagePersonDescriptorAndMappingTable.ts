import {MigrationInterface, QueryRunner} from "typeorm";

export class PersonImagePersonDescriptorAndMappingTable1555958399581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "person_image" ("personId" integer NOT NULL, "imageId" integer NOT NULL, "descriptor" numeric array, CONSTRAINT "REL_349fa7aa34745271baefc3d207" UNIQUE ("personId"), CONSTRAINT "REL_e427ca2257cebcd7de37818377" UNIQUE ("imageId"), CONSTRAINT "PK_b806c9e12b3f946358d3d1b9c72" PRIMARY KEY ("personId", "imageId"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "image" character varying, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person_descriptor" ("id" integer NOT NULL, "descriptor" numeric array, CONSTRAINT "PK_7719c42e299644100eee87e98f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_349fa7aa34745271baefc3d2077" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_e427ca2257cebcd7de378183773" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_e427ca2257cebcd7de378183773"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_349fa7aa34745271baefc3d2077"`);
        await queryRunner.query(`DROP TABLE "person_descriptor"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "person_image"`);
    }

}
