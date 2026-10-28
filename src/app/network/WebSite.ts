import { BaseHandler } from "./BaseHandler";

export class WebSite extends BaseHandler {
  public sendRequest(requestData: any): void {
    console.log(`[WebSite] Получен запрос от пользователя.`);
    this.handleRequest(requestData);
  }
  public handleRequest(requestData: any): void {
    console.log(`[WebSite] Передача запроса балансировщику...`);
  }
}
