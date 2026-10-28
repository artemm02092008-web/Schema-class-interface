import { Application } from "../domain/Application";
import { Budget } from "../domain/Budget";
import { Tender } from "../domain/Tender";

export interface ICache {
  key: string;
  value: any;
  get(key: string): any | null;
  set(key: string, value: any): void;
}

export interface IDatabase {
  dbName: string;
  saveApplication(application: Application): void;
  getApplication(id: number): Application | null;
  updateBudget(budget: Budget): void;
  saveTender(tender: Tender): void;
}

export interface IExternalSystem {
  apiUrl: string;
  syncData(data: any): void;
}
