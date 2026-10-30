import express from 'express';
import cors from 'cors';
import tenderRoutes from '../pages/tender-routes';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Подключаем роуты из слоя pages
app.use('/api', tenderRoutes);

app.listen(port, () => {
  console.log(`🚀 FSD Сервер запущен на http://localhost:${port}`);
});
