import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1605821836983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "description",
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
        return await queryRunner.dropTable("products");
    }
}
