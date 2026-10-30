import { ITenderRepository } from './tender.repository.interface';
import { Database } from '../../shared/db/database.singleton';
import { tenders } from '../../shared/schema';

// ПАТТЕРН: Singleton + Repository
export class TenderRepository implements ITenderRepository {
  private static instance: TenderRepository;
  private db = Database.getInstance().db;

  private constructor() {} // Запрещаем new TenderRepository()

  public static getInstance(): TenderRepository {
    if (!TenderRepository.instance) {
      TenderRepository.instance = new TenderRepository();
    }
    return TenderRepository.instance;
  }

  async create(data: any) {
    return await this.db.insert(tenders).values({
      title: data.title,
      startingPrice: data.startingPrice.toString(),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: 'PUBLISHED',
      managerId: data.managerId || 1, 
    }).returning();
  }

  async findAll() {
    return await this.db.select().from(tenders);
  }
}
