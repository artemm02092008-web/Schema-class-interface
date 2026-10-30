import { TenderRepository } from "../../entities/tender/tender.repository";

export class CreateTenderService {
  constructor(private tenderRepo: TenderRepository) {}

  async execute(data: any) {
    // Проверка названия
    if (!data.title || data.title.trim() === "") {
      throw new Error("Название тендера обязательно");
    }

    // Проверка цены
    if (Number(data.startingPrice) <= 0) {
      throw new Error("Цена должна быть больше нуля");
    }

    // Вызов репозитория для сохранения
    return await this.tenderRepo.create(data);
  }
}
