import { Router } from "express";

import * as RequestController from "../controllers/RequestController.js";

const router = Router();

router.get("/", RequestController.getRequests);
router.post("/", RequestController.createRequest);
router.put("/:id", RequestController.updateRequest);
router.delete("/:id", RequestController.deleteRequest);
router.get("/:id", RequestController.getRequest);

export default router;