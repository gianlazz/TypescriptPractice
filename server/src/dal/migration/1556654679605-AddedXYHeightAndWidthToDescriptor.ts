import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedXYHeightAndWidthToDescriptor1556654679605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_descriptor" ADD "x" numeric`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ADD "y" numeric`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ADD "height" numeric`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ADD "width" numeric`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "firstSeenDateTime"`);
        await queryRunner.query(`ALTER TABLE "person" ADD "firstSeenDateTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "firstSeenDateTime"`);
        await queryRunner.query(`ALTER TABLE "person" ADD "firstSeenDateTime" character varying`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" DROP COLUMN "x"`);
    }

}
