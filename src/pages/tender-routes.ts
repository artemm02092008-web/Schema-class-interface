import { Router } from 'express';
import { TenderRepository } from '../entities/tender/tender.repository';
import { CreateTenderService } from '../features/create-tender/create-tender.service';

const router = Router();

// ПАТТЕРН: Singleton в действии
// Мы не создаем новый экземпляр, а берем единственный существующий.
const tenderRepo = TenderRepository.getInstance();
const createTenderService = new CreateTenderService(tenderRepo);

router.get('/tenders', async (req, res) => {
  try {
    const tenders = await tenderRepo.findAll();
    res.json(tenders);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/tenders', async (req, res) => {
  try {
    const result = await createTenderService.execute(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
