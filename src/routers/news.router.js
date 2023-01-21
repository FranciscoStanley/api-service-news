import { Router } from "express";
import newsController from "../controllers/news.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.get("/", newsController.getAll);
router.get("/top", newsController.topNews);
router.post("/", authMiddleware, newsController.create);
export default router;
