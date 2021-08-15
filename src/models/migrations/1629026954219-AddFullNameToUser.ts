import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFullNameToUser1629026954219 implements MigrationInterface {
    name = 'AddFullNameToUser1629026954219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    }

}
