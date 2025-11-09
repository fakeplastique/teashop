import "reflect-metadata";
import { AppDataSource } from "@/ormconfig";

let initialized = false;

export async function getDataSource() {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
    console.log("Database connected successfully");
  }
  return AppDataSource;
}