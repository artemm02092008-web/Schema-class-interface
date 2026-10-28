import type { Config } from "drizzle-kit";
import "dotenv/config"; // <-- Добавьте эту строку, чтобы файл .env читался

export default {
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
