import {
  pgTable,
  bigint,
  varchar,
  timestamp,
  numeric,
  index,
} from "drizzle-orm/pg-core";
// 1. ТАБЛИЦА: ПОЛЬЗОВАТЕЛЬ
export const users = pgTable("users", {
  userId: bigint("user_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  login: varchar("login", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

// 2. ТАБЛИЦА: ТЕНДЕР
// Связь 1:M к Пользователю (manager_id)
export const tenders = pgTable('tenders', {
  tenderId: bigint('tender_id', { mode: 'number' })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  startingPrice: numeric('starting_price', { precision: 15, scale: 2 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  
  // Внешний ключ (FK). При удалении пользователя ставим NULL.
  managerId: bigint('manager_id', { mode: 'number' })
    .references(() => users.userId, { onDelete: 'set null' }),
}, (table) => ({
  // Индекс для ускорения поиска по менеджеру
  managerIdx: index('idx_tenders_manager_id').on(table.managerId),
}));
