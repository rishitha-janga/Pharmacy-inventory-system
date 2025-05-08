import { Router } from "express";
import * as UserController from "../controllers/UserController.js";
const router = Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/:id", UserController.getUser);
router.post("/login", UserController.loginUser);

export default router;
