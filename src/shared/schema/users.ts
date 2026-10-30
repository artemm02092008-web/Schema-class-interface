// ПОЛЬЗОВАТЕЛЬ
import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: bigint("user_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  login: varchar("login", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
