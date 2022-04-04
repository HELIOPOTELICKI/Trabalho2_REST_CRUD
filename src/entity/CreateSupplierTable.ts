import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSupplierTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.createTable(new Table({
      name: "suppliers",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: "cnpj",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "name",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "phone",
          type: "varchar",
          isNullable: true
        },
        {
          name: "zipcode",
          type: "varchar",
          isNullable: true
        },
        {
          name: "created_At",
          type: "timestamp",
          default: 'now()',
        },
        {
          name: "updated_At",
          type: "timestamp",
          default: 'now()',
        },
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.dropTable("suppliers");
  }
}