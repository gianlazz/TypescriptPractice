import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedDateTimeFirstSeenFromPerson1556754521846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "firstSeenDateTime"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person" ADD "firstSeenDateTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
