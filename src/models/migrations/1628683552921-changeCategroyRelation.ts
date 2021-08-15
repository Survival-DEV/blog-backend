import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeCategroyRelation1628683552921 implements MigrationInterface {
  name = 'changeCategroyRelation1628683552921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parent_id"`);
    await queryRunner.query(`ALTER TABLE "blogs" ADD "category_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_1f073a9f9720fe731423f1064cc" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_1f073a9f9720fe731423f1064cc"`,
    );
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "category_id"`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "parent_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
