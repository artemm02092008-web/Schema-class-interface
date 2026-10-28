export class Tender {
  constructor(
    public tenderId: number,
    public startingPrice: number,
    public status: string
  ) {}

  public createTender(): void {
    this.status = "PUBLISHED";
    console.log(
      `[Tender] Тендер ${this.tenderId} опубликован. Цена: ${this.startingPrice}`
    );
  }

  public determineWinner(): void {
    this.status = "COMPLETED";
    console.log(`[Tender] Победитель по тендеру ${this.tenderId} определен.`);
  }
}
