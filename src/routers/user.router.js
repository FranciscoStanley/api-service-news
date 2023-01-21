import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/user.middlewares.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:_id", validId, validUser, userController.getUserById);
router.post("/", userController.insertUser);
router.patch("/:_id", validId, userController.updateUser);
router.delete("/:_id", userController.deleteUser);

export default router;
