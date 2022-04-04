import { MigrationInterface, QueryRunner } from "typeorm";

export class tables1605825515535 implements MigrationInterface {
    name = 'tables1605825515535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `products_suppliers_suppliers` (`productsId` int NOT NULL, `suppliersId` int NOT NULL, `suppliersCnpj` varchar(255) NOT NULL, INDEX `IDX_f69c1ab7ea2331876b3ae7bd9b` (`productsId`), INDEX `IDX_2486a41de029277bb1be521417` (`suppliersId`, `suppliersCnpj`), PRIMARY KEY (`productsId`, `suppliersId`, `suppliersCnpj`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `suppliers` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `suppliers` ADD PRIMARY KEY (`id`, `cnpj`)");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `cnpj` `cnpj` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `phone` `phone` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `zipcode` `zipcode` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `suppliers` DROP COLUMN `created_At`");
        await queryRunner.query("ALTER TABLE `suppliers` ADD `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `suppliers` DROP COLUMN `updated_At`");
        await queryRunner.query("ALTER TABLE `suppliers` ADD `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `products` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `description` `description` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `created_At`");
        await queryRunner.query("ALTER TABLE `products` ADD `created_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `updated_At`");
        await queryRunner.query("ALTER TABLE `products` ADD `updated_At` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `products_suppliers_suppliers` ADD CONSTRAINT `FK_f69c1ab7ea2331876b3ae7bd9b9` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_suppliers_suppliers` ADD CONSTRAINT `FK_2486a41de029277bb1be5214171` FOREIGN KEY (`suppliersId`, `suppliersCnpj`) REFERENCES `suppliers`(`id`,`cnpj`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products_suppliers_suppliers` DROP FOREIGN KEY `FK_2486a41de029277bb1be5214171`");
        await queryRunner.query("ALTER TABLE `products_suppliers_suppliers` DROP FOREIGN KEY `FK_f69c1ab7ea2331876b3ae7bd9b9`");
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `updated_At`");
        await queryRunner.query("ALTER TABLE `products` ADD `updated_At` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `created_At`");
        await queryRunner.query("ALTER TABLE `products` ADD `created_At` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `products` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `name` `name` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` DROP COLUMN `updated_At`");
        await queryRunner.query("ALTER TABLE `suppliers` ADD `updated_At` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `suppliers` DROP COLUMN `created_At`");
        await queryRunner.query("ALTER TABLE `suppliers` ADD `created_At` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `zipcode` `zipcode` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `phone` `phone` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `name` `name` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `cnpj` `cnpj` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `suppliers` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `suppliers` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `suppliers` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("DROP INDEX `IDX_2486a41de029277bb1be521417` ON `products_suppliers_suppliers`");
        await queryRunner.query("DROP INDEX `IDX_f69c1ab7ea2331876b3ae7bd9b` ON `products_suppliers_suppliers`");
        await queryRunner.query("DROP TABLE `products_suppliers_suppliers`");
    }

}
