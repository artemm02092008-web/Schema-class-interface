import { pgTable, bigint, numeric } from "drizzle-orm/pg-core";
import { applications } from "./applications";

export const budgets = pgTable("budgets", {
  budgetId: bigint("budget_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  applicationId: bigint("application_id", { mode: "number" })
    .notNull()
    .unique() // 1 к 1
    .references(() => applications.applicationId, { onDelete: "cascade" }),
  totalLimit: numeric("total_limit", { precision: 15, scale: 2 }).notNull(),
  spentAmount: numeric("spent_amount", { precision: 15, scale: 2 })
    .notNull()
    .default("0"),
  availableAmount: numeric("available_amount", {
    precision: 15,
    scale: 2,
  }).notNull(),
});
// Бюджет 