import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';
import 'dotenv/config';

// ПАТТЕРН: Singleton (Одиночка)
// Гарантирует, что подключение к БД будет создано только один раз за всё время работы сервера.
export class Database {
  private static instance: Database;
  public db: NodePgDatabase<typeof schema>;

  private constructor() {
    // Приватный конструктор запрещает делать new Database() снаружи
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool, { schema });
  }

  // Глобальная точка доступа
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
