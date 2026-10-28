export class Budget {
  constructor(public totalLimit: number, public spentAmount: number) {}

  public checkLimit(amount: number): boolean {
    const isAvailable = this.spentAmount + amount <= this.totalLimit;
    console.log(
      `[Budget] Проверка лимита: доступно ${
        this.totalLimit - this.spentAmount
      }, запрос ${amount}. Успех: ${isAvailable}`
    );
    return isAvailable;
  }
}
