import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

type Database = ReturnType<typeof drizzle>;

let database: Database | undefined;

export function getDb() {
  if (database) {
    return database;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to connect to the database.");
  }

  database = drizzle({ client: neon(databaseUrl) });
  return database;
}
