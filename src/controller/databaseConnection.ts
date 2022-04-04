// TypeORM connection and Entity
import { Connection, createConnection } from "typeorm";
import { Supplier } from "../entity/Supplier";
import { Product } from "../entity/Product";
import { User } from "../entity/User";

export let databaseConnection: Connection;

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "nodejs_rest",
  entities: [Supplier, Product, User],
  synchronize: true,
  logging: false,

  migrationsTableName: "custom_migration_table",
  migrations: [Supplier, Product, User],
  cli: {
    entitiesDir: __dirname + "/entity/",
    migrationsDir: __dirname + '/migrations/'
  }
}).then((connection) => {
  databaseConnection = connection;
  console.log("Connected to the database...");
});
