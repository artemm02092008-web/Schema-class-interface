import { IDatabase, ICache, IExternalSystem } from "./infra/interfaces";
import { Application } from "./domain/Application";
import { Budget } from "./domain/Budget";

export class Server {
  constructor(
    public ipAddress: string,
    public activeConnections: number,
    private db: IDatabase,
    private cache: ICache,
    private externalSystem: IExternalSystem
  ) {}

  public processRequest(action: string, payload: any): void {
    console.log(`\n[Server] Обработка запроса: ${action}`);
    if (action === "CREATE_APPLICATION") {
      this.handleApplication(payload.application, payload.budget);
    } else if (action === "CHECK_BUDGET") {
      this.checkBudget(payload.budget, payload.amount);
    }
  }

  public handleApplication(application: Application, budget: Budget): void {
    if (!this.checkBudget(budget, application.amount)) {
      console.log(`[Server] ОТКАЗ: Недостаточно средств.`);
      return;
    }
    application.create();
    this.db.saveApplication(application);
    this.db.updateBudget(budget);
    this.cache.set(`app_${application.applicationId}`, application);
    this.externalSystem.syncData({
      type: "NEW_APPLICATION",
      data: application,
    });
  }

  public checkBudget(budget: Budget, amount: number): boolean {
    const isAllowed = budget.checkLimit(amount);
    if (isAllowed) budget.spentAmount += amount;
    return isAllowed;
  }
}
