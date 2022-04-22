import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1650633636561 implements MigrationInterface {
  name = 'init1650633636561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."client_currency_enum" AS ENUM('USD', 'EUR', 'CLP')`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "business_name" character varying(50) NOT NULL, "tax_identification_number" character varying(50) NOT NULL, "monthly_request" integer NOT NULL, "currency" "public"."client_currency_enum" NOT NULL DEFAULT 'CLP', "bank_information" numeric array NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "vendor_id" integer NOT NULL, "invoice_number" character varying(255) NOT NULL, "invoice_date" date NOT NULL, "invoice_total" integer NOT NULL, "payment_total" integer NOT NULL, "credit_total" integer NOT NULL, "bank_id" integer NOT NULL, "invoice_due_date" date NOT NULL, "payment_date" date NOT NULL, "currency" character varying(10) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TYPE "public"."client_currency_enum"`);
  }
}
