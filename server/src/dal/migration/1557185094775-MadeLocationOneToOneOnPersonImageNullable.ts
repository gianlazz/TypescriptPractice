import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeLocationOneToOneOnPersonImageNullable1557185094775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_35a2149f79bbeabf2554199339b"`);
        await queryRunner.query(`ALTER TABLE "person_image" ALTER COLUMN "locationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_35a2149f79bbeabf2554199339b" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_35a2149f79bbeabf2554199339b"`);
        await queryRunner.query(`ALTER TABLE "person_image" ALTER COLUMN "locationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_35a2149f79bbeabf2554199339b" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
