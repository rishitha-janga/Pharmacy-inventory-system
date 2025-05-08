import { Router } from "express";

import * as MessageController from "../controllers/MessageController.js";

const router = Router();

router.get("/", MessageController.getMessages);
router.post("/", MessageController.createMessage);
router.put("/:id", MessageController.updateMessage);
router.delete("/:id", MessageController.deleteMessage);
router.get("/:id", MessageController.getMessage);

export default router;
