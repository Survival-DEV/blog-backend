import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBlogsTagsTable1628689217746 implements MigrationInterface {
    name = 'updateBlogsTagsTable1628689217746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_54152067e596524b98f1e402b58"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_aa7b611ca7814c61380e050bd73"`);
        await queryRunner.query(`DROP INDEX "IDX_54152067e596524b98f1e402b5"`);
        await queryRunner.query(`DROP INDEX "IDX_aa7b611ca7814c61380e050bd7"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "PK_112213035d78c06a21cd281b589"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "PK_aa7b611ca7814c61380e050bd73" PRIMARY KEY ("tags")`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP COLUMN "blogs"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "PK_aa7b611ca7814c61380e050bd73"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD "blog" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "PK_daa3c96bd8ca181a4ba93e95fa9" PRIMARY KEY ("blog")`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD "tag" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "PK_daa3c96bd8ca181a4ba93e95fa9"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "PK_b07d25ef988c1258af5b0eb0c3f" PRIMARY KEY ("blog", "tag")`);
        await queryRunner.query(`CREATE INDEX "IDX_daa3c96bd8ca181a4ba93e95fa" ON "blogs_tags" ("blog") `);
        await queryRunner.query(`CREATE INDEX "IDX_e363afb15da61b63badd18f96c" ON "blogs_tags" ("tag") `);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_daa3c96bd8ca181a4ba93e95fa9" FOREIGN KEY ("blog") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_e363afb15da61b63badd18f96cd" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_e363afb15da61b63badd18f96cd"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_daa3c96bd8ca181a4ba93e95fa9"`);
        await queryRunner.query(`DROP INDEX "IDX_e363afb15da61b63badd18f96c"`);
        await queryRunner.query(`DROP INDEX "IDX_daa3c96bd8ca181a4ba93e95fa"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "PK_b07d25ef988c1258af5b0eb0c3f"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "PK_daa3c96bd8ca181a4ba93e95fa9" PRIMARY KEY ("blog")`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "PK_daa3c96bd8ca181a4ba93e95fa9"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP COLUMN "blog"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD "tags" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "PK_aa7b611ca7814c61380e050bd73" PRIMARY KEY ("tags")`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD "blogs" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" DROP CONSTRAINT "PK_aa7b611ca7814c61380e050bd73"`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "PK_112213035d78c06a21cd281b589" PRIMARY KEY ("blogs", "tags")`);
        await queryRunner.query(`CREATE INDEX "IDX_aa7b611ca7814c61380e050bd7" ON "blogs_tags" ("tags") `);
        await queryRunner.query(`CREATE INDEX "IDX_54152067e596524b98f1e402b5" ON "blogs_tags" ("blogs") `);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_aa7b611ca7814c61380e050bd73" FOREIGN KEY ("tags") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_54152067e596524b98f1e402b58" FOREIGN KEY ("blogs") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
