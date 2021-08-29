import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReadtimeColumnToBlog1630234942383
  implements MigrationInterface
{
  name = 'AddReadtimeColumnToBlog1630234942383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31"`);
    await queryRunner.query(`ALTER TABLE "blogs" ADD "read_time" integer`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31" ON "blogs" ("title") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31"`);
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "read_time"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31" ON "blogs" ("title") `,
    );
  }
}
