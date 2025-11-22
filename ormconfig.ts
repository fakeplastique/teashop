import { DataSource } from "typeorm";
import { Tea } from "@/entities/Tea";
import { StaticPage } from "@/entities/StaticPage";
import { User } from "@/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DATABASE_NAME || "teashop",
  synchronize: true,
  logging: false,
  entities: [Tea, StaticPage, User],
  migrations: [],
  subscribers: [],
});
