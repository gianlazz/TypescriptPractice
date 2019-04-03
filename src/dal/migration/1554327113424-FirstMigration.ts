import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1554327113424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "guitar" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer, "color" character varying, CONSTRAINT "PK_cda66a01dabadeebb230ca2d457" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "guitar"`);
    }

}
