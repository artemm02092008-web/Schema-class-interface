import { ITenderRepository } from "./tender.repository.interface";
import { Database } from "../../shared/db/database.singleton";
import { tenders } from "../../shared/schema";

// ПАТТЕРН: Singleton + Repository
export class TenderRepository implements ITenderRepository {
  private static instance: TenderRepository;
  private db = Database.getInstance().db;

  private constructor() {}

  public static getInstance(): TenderRepository {
    if (!TenderRepository.instance) {
      TenderRepository.instance = new TenderRepository();
    }
    return TenderRepository.instance;
  }

  async create(data: any) {
    try {
      console.log("=== ДАННЫЕ ДЛЯ СОЗДАНИЯ ТЕНДЕРА ===", data); // <-- Для отладки

      const result = await this.db
        .insert(tenders)
        .values({
          title: data.title,
          startingPrice: data.startingPrice.toString(),
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          status: "PUBLISHED",
          managerId: data.managerId || 1,
        })
        .returning();

      console.log("=== ТЕНДЕР СОЗДАН В БД ===", result[0]); // <-- Для отладки
      return result[0];
    } catch (error) {
      console.error("=== ОШИБКА ВСТАВКИ В БД ===", error); // <-- Покажет ошибку
      throw error;
    }
  }

  async findAll() {
    return await this.db.select().from(tenders);
  }
}
