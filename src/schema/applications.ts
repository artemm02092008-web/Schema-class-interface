import {
  pgTable,
  bigint,
  varchar,
  timestamp,
  numeric,
  index,
} from "drizzle-orm/pg-core";
import { tenders } from "./tenders";
import { users } from "./users";

export const applications = pgTable(
  "applications",
  {
    applicationId: bigint("application_id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    tenderId: bigint("tender_id", { mode: "number" })
      .notNull()
      .references(() => tenders.tenderId, { onDelete: "restrict" }),
    customerId: bigint("customer_id", { mode: "number" })
      .notNull()
      .references(() => users.userId, { onDelete: "restrict" }),
    amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
    createdDate: timestamp("created_date").notNull().defaultNow(),
    status: varchar("status", { length: 50 }).notNull(),
  },
  (table) => ({
    tenderIdx: index("idx_applications_tender_id").on(table.tenderId),
    customerIdx: index("idx_applications_customer").on(table.customerId),
  })
);
// Заявкик