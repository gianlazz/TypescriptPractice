import {MigrationInterface, QueryRunner} from "typeorm";

export class MadeDescriptorBoxValuesNotNullable1556665305166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "x" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "y" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "height" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "width" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "width" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "height" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "y" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "x" DROP NOT NULL`);
    }

}
