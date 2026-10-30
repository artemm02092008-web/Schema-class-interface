import { TenderRepository } from '../../entities/tender/tender.repository';

export class CreateTenderService {
  constructor(private tenderRepo: TenderRepository) {}

  async execute(data: any) {

    if (Number(data.startingPrice) <= 0) {
      throw new Error('Цена должна быть больше нуля');
    }
    return await this.tenderRepo.create(data);
  }
}
