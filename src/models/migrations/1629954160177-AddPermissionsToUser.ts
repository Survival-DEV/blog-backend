import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPermissionsToUser1629954160177 implements MigrationInterface {
    name = 'AddPermissionsToUser1629954160177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'Guest'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
