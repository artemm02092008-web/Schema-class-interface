export class Application {
  constructor(
    public applicationId: number,
    public amount: number,
    public status: string
  ) {}

  public create(): void {
    this.status = "SUBMITTED";
    console.log(
      `[Application] Заявка ${this.applicationId} создана на сумму ${this.amount}`
    );
  }

  public approve(): void {
    this.status = "APPROVED";
    console.log(`[Application] Заявка ${this.applicationId} одобрена.`);
  }
}
