import { pgTable, bigint, varchar, index } from "drizzle-orm/pg-core";
import { applications } from "./applications";

export const invoices = pgTable(
  "invoices",
  {
    invoiceId: bigint("invoice_id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    applicationId: bigint("application_id", { mode: "number" })
      .notNull()
      .references(() => applications.applicationId, { onDelete: "cascade" }),
    paymentStatus: varchar("payment_status", { length: 50 }).notNull(),
    bankTransactionId: varchar("bank_transaction_id", { length: 255 }),
  },
  (table) => ({
    applicationIdx: index("idx_invoices_application").on(table.applicationId),
  })
);
