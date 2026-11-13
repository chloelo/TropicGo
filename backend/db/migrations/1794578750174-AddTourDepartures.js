/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddTourDepartures1794578750174 {
  name = 'AddTourDepartures1794578750174';

  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "tour_departures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "departure_date" date NOT NULL, "capacity" integer NOT NULL, "booked_count" integer NOT NULL DEFAULT '0', "is_enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tour_id" uuid NOT NULL, CONSTRAINT "UQ_tour_departures_tour_date" UNIQUE ("tour_id", "departure_date"), CONSTRAINT "CHK_tour_departures_booked_count" CHECK ("booked_count" >= 0 AND "booked_count" <= "capacity"), CONSTRAINT "CHK_tour_departures_capacity" CHECK ("capacity" > 0), CONSTRAINT "PK_5499d53430d54ba9b6a0d902ca2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "order_items" ADD "departure_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tour_departures" ADD CONSTRAINT "FK_e25567e8840d94772a33fc26e77" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_d296debe2c9cf99127959293e30" FOREIGN KEY ("departure_id") REFERENCES "tour_departures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_d296debe2c9cf99127959293e30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tour_departures" DROP CONSTRAINT "FK_e25567e8840d94772a33fc26e77"`,
    );
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "departure_id"`);
    await queryRunner.query(`DROP TABLE "tour_departures"`);
  }
};
