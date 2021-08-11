import {MigrationInterface, QueryRunner} from "typeorm";

export class addTagBlogRelation1628683666951 implements MigrationInterface {
    name = 'addTagBlogRelation1628683666951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blogs_tags_tags" ("blogs_id" uuid NOT NULL, "tags_id" uuid NOT NULL, CONSTRAINT "PK_c5c80295303a602c3250158f0dd" PRIMARY KEY ("blogs_id", "tags_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abd37453124187f7f887990644" ON "blogs_tags_tags" ("blogs_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3da077225fb0856fd6b0ba4a44" ON "blogs_tags_tags" ("tags_id") `);
        await queryRunner.query(`ALTER TABLE "blogs_tags_tags" ADD CONSTRAINT "FK_abd37453124187f7f887990644c" FOREIGN KEY ("blogs_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blogs_tags_tags" ADD CONSTRAINT "FK_3da077225fb0856fd6b0ba4a44d" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs_tags_tags" DROP CONSTRAINT "FK_3da077225fb0856fd6b0ba4a44d"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags_tags" DROP CONSTRAINT "FK_abd37453124187f7f887990644c"`);
        await queryRunner.query(`DROP INDEX "IDX_3da077225fb0856fd6b0ba4a44"`);
        await queryRunner.query(`DROP INDEX "IDX_abd37453124187f7f887990644"`);
        await queryRunner.query(`DROP TABLE "blogs_tags_tags"`);
    }

}
