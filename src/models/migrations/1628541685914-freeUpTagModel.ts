import {MigrationInterface, QueryRunner} from "typeorm";

export class freeUpTagModel1628541685914 implements MigrationInterface {
    name = 'freeUpTagModel1628541685914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "meta_title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "meta_title" SET NOT NULL`);
    }

}
