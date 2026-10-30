import { Router } from "express";
import { eq } from "drizzle-orm";
import { TenderRepository } from "../entities/tender/tender.repository";
import { CreateTenderService } from "../features/create-tender/create-tender.service";
import { Database } from "../shared/db/database.singleton";
import { users, applications } from "../shared/schema";

const router = Router();

const tenderRepo = TenderRepository.getInstance();
const createTenderService = new CreateTenderService(tenderRepo);

// ==========================================
// МАРШРУТЫ ДЛЯ ТЕНДЕРОВ
// ==========================================

router.get("/tenders", async (req, res) => {
  try {
    const tenders = await tenderRepo.findAll();
    res.json(tenders);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/tenders", async (req, res) => {
  try {
    const result = await createTenderService.execute(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// ==========================================
// МАРШРУТЫ ДЛЯ АВТОРИЗАЦИИ
// ==========================================

router.post("/auth/register", async (req, res) => {
  try {
    // 1. Получаем name из тела запроса
    const { login, password, role, email, name } = req.body;
    const db = Database.getInstance().db;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.login, login));
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким логином уже существует" });
    }

    const newUser = await db
      .insert(users)
      .values({
        login,
        passwordHash: password,
        role,
        email,
        name: name || "Пользователь", // 2. Сохраняем имя (если не передано, ставим заглушку)
      })
      .returning();

    res.status(201).json({ message: "Пользователь создан", user: newUser[0] });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    res.status(500).json({ error: "Ошибка сервера при регистрации" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const db = Database.getInstance().db;

    const user = await db.select().from(users).where(eq(users.login, login));

    if (user.length === 0) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }

    if (user[0].passwordHash !== password) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    res.json({
      message: "Успешный вход",
      user: {
        userId: user[0].userId,
        login: user[0].login,
        role: user[0].role,
        email: user[0].email,
        name: user[0].name, // 3. Возвращаем имя на фронтенд
      },
    });
  } catch (error) {
    console.error("Ошибка входа:", error);
    res.status(500).json({ error: "Ошибка сервера при входе" });
  }
});

// ==========================================
// МАРШРУТЫ ДЛЯ ЗАЯВОК
// ==========================================

router.get("/applications", async (req, res) => {
  try {
    const db = Database.getInstance().db;
    const apps = await db.select().from(applications);
    res.json(apps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка загрузки заявок" });
  }
});

router.post("/applications", async (req, res) => {
  try {
    const { tenderId, customerId, amount } = req.body;
    const db = Database.getInstance().db;

    const newApp = await db
      .insert(applications)
      .values({
        tenderId: Number(tenderId),
        customerId: Number(customerId),
        amount: amount.toString(),
        status: "SUBMITTED",
        createdDate: new Date(),
      })
      .returning();

    res.status(201).json(newApp[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании заявки" });
  }
});

export default router;
