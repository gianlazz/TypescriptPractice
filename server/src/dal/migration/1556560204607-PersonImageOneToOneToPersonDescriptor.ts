import {MigrationInterface, QueryRunner} from "typeorm";

export class PersonImageOneToOneToPersonDescriptor1556560204607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" ADD "personDescriptorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "UQ_681441222495f9346865e0c4bef" UNIQUE ("personDescriptorId")`);
        await queryRunner.query(`CREATE SEQUENCE "person_descriptor_id_seq" OWNED BY "person_descriptor"."id"`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "id" SET DEFAULT nextval('person_descriptor_id_seq')`);
        await queryRunner.query(`ALTER TABLE "person_image" ADD CONSTRAINT "FK_681441222495f9346865e0c4bef" FOREIGN KEY ("personDescriptorId") REFERENCES "person_descriptor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "FK_681441222495f9346865e0c4bef"`);
        await queryRunner.query(`ALTER TABLE "person_descriptor" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "person_descriptor_id_seq"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP CONSTRAINT "UQ_681441222495f9346865e0c4bef"`);
        await queryRunner.query(`ALTER TABLE "person_image" DROP COLUMN "personDescriptorId"`);
    }

}
