import {MigrationInterface, QueryRunner} from "typeorm";

export class BlogsMigration1624991187241 implements MigrationInterface {
    name = 'BlogsMigration1624991187241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "email" text NOT NULL, "bio" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "github" character varying, "linked_in" character varying, "photo" bytea, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "meta_title" character varying NOT NULL, "slug" character varying NOT NULL, "parent_id" character varying, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "meta_title" character varying NOT NULL, "slug" character varying NOT NULL, "summary" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "claps" integer NOT NULL DEFAULT '0', "header_image" character varying, "published_at" TIMESTAMP, "content" character varying NOT NULL DEFAULT '', "is_draft" boolean, "parent_id" integer, "author_id" uuid, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "meta_title" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogCategory" ("blogsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_b6eda678568c89242be2f372d8d" PRIMARY KEY ("blogsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_055a75bd8761259f0c600cb16a" ON "blogCategory" ("blogsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3aa4f5e8cbda73c40d04bec53" ON "blogCategory" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "FK_b324119dcb71e877cee411f7929" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blogCategory" ADD CONSTRAINT "FK_055a75bd8761259f0c600cb16a1" FOREIGN KEY ("blogsId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blogCategory" ADD CONSTRAINT "FK_b3aa4f5e8cbda73c40d04bec535" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogCategory" DROP CONSTRAINT "FK_b3aa4f5e8cbda73c40d04bec535"`);
        await queryRunner.query(`ALTER TABLE "blogCategory" DROP CONSTRAINT "FK_055a75bd8761259f0c600cb16a1"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "FK_b324119dcb71e877cee411f7929"`);
        await queryRunner.query(`DROP INDEX "IDX_b3aa4f5e8cbda73c40d04bec53"`);
        await queryRunner.query(`DROP INDEX "IDX_055a75bd8761259f0c600cb16a"`);
        await queryRunner.query(`DROP TABLE "blogCategory"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "blogs"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
