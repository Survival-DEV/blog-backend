import {MigrationInterface, QueryRunner} from "typeorm";

export class CategoryMigration1624997421537 implements MigrationInterface {
    name = 'CategoryMigration1624997421537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_closure_closure" ("ancestor_id" uuid NOT NULL, "descendant_id" uuid NOT NULL, CONSTRAINT "PK_d9d3ea3acf527f98cba5502f1af" PRIMARY KEY ("ancestor_id", "descendant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a77c180077b1cd5d55539d396a" ON "category_closure_closure" ("ancestor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cef5852fefd02e5ee7fe62db96" ON "category_closure_closure" ("descendant_id") `);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "parent_id" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_closure_closure" ADD CONSTRAINT "FK_a77c180077b1cd5d55539d396ad" FOREIGN KEY ("ancestor_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_closure_closure" ADD CONSTRAINT "FK_cef5852fefd02e5ee7fe62db96f" FOREIGN KEY ("descendant_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_closure_closure" DROP CONSTRAINT "FK_cef5852fefd02e5ee7fe62db96f"`);
        await queryRunner.query(`ALTER TABLE "category_closure_closure" DROP CONSTRAINT "FK_a77c180077b1cd5d55539d396ad"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "parent_id" character varying`);
        await queryRunner.query(`DROP INDEX "IDX_cef5852fefd02e5ee7fe62db96"`);
        await queryRunner.query(`DROP INDEX "IDX_a77c180077b1cd5d55539d396a"`);
        await queryRunner.query(`DROP TABLE "category_closure_closure"`);
    }

}
