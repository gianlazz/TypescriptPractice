import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedInvite1557271212534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "invite" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "invite"`);
    }

}
