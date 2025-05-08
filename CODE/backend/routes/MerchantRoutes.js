import { Router } from "express";
import * as MerchantController from "../controllers/MerchantController.js"
const router = Router();

router.get("/", MerchantController.getMechants);
router.post("/", MerchantController.createMerchant);
router.put("/:id", MerchantController.updateMerchant);
router.delete("/:id", MerchantController.deleteMerchant);
router.get("/:id", MerchantController.getMerchant);
router.post("/login", MerchantController.loginMerchant);

export default router;