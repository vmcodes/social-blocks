import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "better-sqlite3",
  database: "database/app.db",
  entities: [__dirname + "/entities/*.entity{.ts,.js}"],
  logging: true,
  synchronize: true,
});
