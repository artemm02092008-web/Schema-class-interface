import { pgTable, bigint, varchar, timestamp, numeric, index } from 'drizzle-orm/pg-core';
import { users } from './users'; // <--- Импорт для FK
export const tenders = pgTable('tenders', {
  tenderId: bigint('tender_id', { mode: 'number' })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  startingPrice: numeric('starting_price', { precision: 15, scale: 2 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  
  managerId: bigint('manager_id', { mode: 'number' })
    .references(() => users.userId, { onDelete: 'set null' }), // Связь с users
}, (table) => ({
  managerIdx: index('idx_tenders_manager_id').on(table.managerId),
}));
// Тендер