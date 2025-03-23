import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "server/drizzle/migration",
  schema: "server/drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});