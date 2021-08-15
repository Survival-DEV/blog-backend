import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameBlogTagTable1628686044524 implements MigrationInterface {
  name = 'renameBlogTagTable1628686044524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blogs_tags" ("blogs" uuid NOT NULL, "tags" uuid NOT NULL, CONSTRAINT "PK_112213035d78c06a21cd281b589" PRIMARY KEY ("blogs", "tags"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54152067e596524b98f1e402b5" ON "blogs_tags" ("blogs") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa7b611ca7814c61380e050bd7" ON "blogs_tags" ("tags") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "meta_title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "is_draft" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_54152067e596524b98f1e402b58" FOREIGN KEY ("blogs") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_aa7b611ca7814c61380e050bd73" FOREIGN KEY ("tags") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_aa7b611ca7814c61380e050bd73"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_54152067e596524b98f1e402b58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "is_draft" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "meta_title" SET NOT NULL`,
    );
    await queryRunner.query(`DROP INDEX "IDX_aa7b611ca7814c61380e050bd7"`);
    await queryRunner.query(`DROP INDEX "IDX_54152067e596524b98f1e402b5"`);
    await queryRunner.query(`DROP TABLE "blogs_tags"`);
  }
}
