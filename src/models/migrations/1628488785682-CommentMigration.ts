import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentMigration1628488785682 implements MigrationInterface {
  name = 'CommentMigration1628488785682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" character varying NOT NULL, "parent_id" uuid, "blog_id" uuid NOT NULL, "level" integer DEFAULT '2', CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_a02e5093a5d47a64f1fd473d1ef" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_89a2762362d968c2939b6fab19" ON "comments_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d2164211fd6ab117cfb2ab8ba9" ON "comments_closure" ("id_descendant") `,
    );
    await queryRunner.query(`ALTER TABLE "blogs" ADD "blog_meta" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "meta_title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31" ON "blogs" ("title") `,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_d6f93329801a93536da4241e386" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_6754bf738cb68004be154e1d1d5" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments_closure" ADD CONSTRAINT "FK_89a2762362d968c2939b6fab193" FOREIGN KEY ("id_ancestor") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments_closure" ADD CONSTRAINT "FK_d2164211fd6ab117cfb2ab8ba96" FOREIGN KEY ("id_descendant") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments_closure" DROP CONSTRAINT "FK_d2164211fd6ab117cfb2ab8ba96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments_closure" DROP CONSTRAINT "FK_89a2762362d968c2939b6fab193"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_6754bf738cb68004be154e1d1d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_d6f93329801a93536da4241e386"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31"`);
    await queryRunner.query(
      `ALTER TABLE "blogs" ALTER COLUMN "meta_title" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "blogs" DROP COLUMN "blog_meta"`);
    await queryRunner.query(`DROP INDEX "IDX_d2164211fd6ab117cfb2ab8ba9"`);
    await queryRunner.query(`DROP INDEX "IDX_89a2762362d968c2939b6fab19"`);
    await queryRunner.query(`DROP TABLE "comments_closure"`);
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
