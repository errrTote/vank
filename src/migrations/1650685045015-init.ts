import {MigrationInterface, QueryRunner} from "typeorm";

export class init1650685045015 implements MigrationInterface {
    name = 'init1650685045015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clients_currency_enum" AS ENUM('USD', 'EUR', 'CLP')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "business_name" character varying(50) NOT NULL, "tax_identification_number" character varying(50) NOT NULL, "monthly_request" integer NOT NULL, "currency" "public"."clients_currency_enum" NOT NULL DEFAULT 'CLP', "bank_information" numeric array NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "origin_id" integer NOT NULL DEFAULT '0', "vendor_id" integer NOT NULL, "invoice_number" character varying(255) NOT NULL, "invoice_date" date, "invoice_total" numeric NOT NULL, "payment_total" numeric NOT NULL, "credit_total" numeric NOT NULL, "bank_id" integer NOT NULL, "invoice_due_date" date, "payment_date" date, "currency" character varying(10) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "public"."clients_currency_enum"`);
    }

}
