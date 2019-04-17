import {MigrationInterface, QueryRunner} from "typeorm";

export class PersonsFaceDescriptionChangedToDecimalArray1555529738558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "persons_face" RENAME COLUMN "jsonDescriptor" TO "descriptor"`);
        await queryRunner.query(`ALTER TABLE "persons_face" DROP COLUMN "descriptor"`);
        await queryRunner.query(`ALTER TABLE "persons_face" ADD "descriptor" numeric array`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "persons_face" DROP COLUMN "descriptor"`);
        await queryRunner.query(`ALTER TABLE "persons_face" ADD "descriptor" character varying`);
        await queryRunner.query(`ALTER TABLE "persons_face" RENAME COLUMN "descriptor" TO "jsonDescriptor"`);
    }

}
