import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTimeStampToPersonImageJoinTable1556752532780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP COLUMN "timestamp"`);
    }

}
