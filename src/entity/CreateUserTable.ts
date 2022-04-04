import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: "username",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "password",
          type: "varchar",
          isNullable: false,
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
    return await queryRunner.dropTable("users");
  }
}