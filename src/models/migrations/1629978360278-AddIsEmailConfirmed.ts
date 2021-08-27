import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsEmailConfirmed1629978360278 implements MigrationInterface {
  name = 'AddIsEmailConfirmed1629978360278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "email" text NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "bio" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "github" character varying, "linked_in" character varying, "photo" bytea, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blogs" ADD CONSTRAINT "FK_b324119dcb71e877cee411f7929" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blogs" DROP CONSTRAINT "FK_b324119dcb71e877cee411f7929"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
