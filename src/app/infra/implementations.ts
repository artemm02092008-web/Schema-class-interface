import { ICache, IDatabase, IExternalSystem } from "./interfaces";
import { Application } from "../domain/Application";
import { Budget } from "../domain/Budget";
import { Tender } from "../domain/Tender";

export class InMemoryCache implements ICache {
  public key: string = "";
  public value: any = null;
  private storage: Map<string, any> = new Map();

  get(key: string): any | null {
    return this.storage.get(key) || null;
  }
  set(key: string, value: any): void {
    this.storage.set(key, value);
    console.log(`[Cache] Данные сохранены в кэш по ключу: ${key}`);
  }
}

export class PostgresDatabase implements IDatabase {
  public dbName: string = "tenders_db";

  saveApplication(application: Application): void {
    console.log(
      `[DB] Заявка ${application.applicationId} сохранена в базу ${this.dbName}`
    );
  }
  getApplication(id: number): Application | null {
    return null;
  }
  updateBudget(budget: Budget): void {
    console.log(`[DB] Бюджет обновлен. Потрачено: ${budget.spentAmount}`);
  }
  saveTender(tender: Tender): void {
    console.log(`[DB] Тендер ${tender.tenderId} сохранен в базу.`);
  }
}

export class BankExternalSystem implements IExternalSystem {
  public apiUrl: string = "https://api.bank.ru/v1";
  syncData(data: any): void {
    console.log(`[ExternalSystem] Синхронизация с банком:`, data);
  }
}
