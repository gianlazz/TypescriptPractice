import {MigrationInterface, QueryRunner} from "typeorm";

export class WorkingPersonToImageManyToManyRelationship1556306705818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP COLUMN "descriptor"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_349fa7aa34745271baefc3d2077"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_e427ca2257cebcd7de378183773"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "REL_349fa7aa34745271baefc3d207"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "REL_e427ca2257cebcd7de37818377"`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_349fa7aa34745271baefc3d2077" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_e427ca2257cebcd7de378183773" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_e427ca2257cebcd7de378183773"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_349fa7aa34745271baefc3d2077"`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "REL_e427ca2257cebcd7de37818377" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "REL_349fa7aa34745271baefc3d207" UNIQUE ("personId")`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_e427ca2257cebcd7de378183773" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_349fa7aa34745271baefc3d2077" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD "descriptor" numeric array`);
    }

}
