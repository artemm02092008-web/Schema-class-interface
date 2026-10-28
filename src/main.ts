import { User } from "./app/domain/User";
import { Tender } from "./app/domain/Tender";
import { Application } from "./app/domain/Application";
import { Budget } from "./app/domain/Budget";
import { WebSite } from "./app/network/WebSite";
import { LoadBalancer } from "./app/network/LoadBalancer";
import { Server } from "./app/Server";
import {
  PostgresDatabase,
  InMemoryCache,
  BankExternalSystem,
} from "./app/infra/implementations";

import * as dbSchema from "./schema";

function main() {
  console.log("=== ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ ===");

  // 1. Инициализируем инфраструктуру
  const db = new PostgresDatabase();
  const cache = new InMemoryCache();
  const externalSystem = new BankExternalSystem();

  // 2. Создаем сервер
  const server = new Server("192.168.0.1", 10, db, cache, externalSystem);

  // 3. Создаем данные
  const user = new User(1, "ivan_ivanov", "hash123", "MANAGER");
  const tender = new Tender(101, 500000, "DRAFT");
  const application = new Application(201, 150000, "DRAFT");
  const budget = new Budget(200000, 0);

  console.log("\n=== 1. РАБОТА ПОЛЬЗОВАТЕЛЯ ===");
  user.authorize();
  tender.createTender();

  console.log("\n=== 2. ОТПРАВКА ЗАПРОСА ===");
  const webSite = new WebSite();
  const loadBalancer = new LoadBalancer();

  webSite.sendRequest({ type: "CREATE_APPLICATION" });
  loadBalancer.distributeTraffic({ type: "CREATE_APPLICATION" });

  console.log("\n=== 3. ОБРАБОТКА НА СЕРВЕРЕ ===");
  server.processRequest("CREATE_APPLICATION", { application, budget });

  console.log("\n=== 4. ПРОВЕРКА РЕЗУЛЬТАТОВ ===");
  console.log(`Статус заявки: ${application.status}`);
  console.log(`Потрачено из бюджета: ${budget.spentAmount}`);
  console.log(`Данные в кэше:`, cache.get(`app_${application.applicationId}`));

  console.log("\n=== 5. ПРОВЕРКА СХЕМЫ БД ===");
  console.log("Таблицы Drizzle доступны для импорта:", Object.keys(dbSchema));
}

main();
