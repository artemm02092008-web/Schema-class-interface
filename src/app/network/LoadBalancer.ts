import { BaseHandler } from "./BaseHandler";

export class LoadBalancer extends BaseHandler {
  public distributeTraffic(requestData: any): void {
    console.log(`[LoadBalancer] Распределение трафика...`);
    this.handleRequest(requestData);
  }
  public handleRequest(requestData: any): void {
    console.log(`[LoadBalancer] Запрос направлен на Сервер.`);
  }
}
