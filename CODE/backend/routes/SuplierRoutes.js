import { Router } from "express";
import * as SupplierController from "../controllers/SuplierController.js";
const router = Router();

router.get("/", SupplierController.getSuppliers);
router.post("/", SupplierController.createSupplier);
router.put("/:id", SupplierController.updateSupplier);
router.delete("/:id", SupplierController.deleteSupplier);
router.get("/:id", SupplierController.getSupplier);
router.post("/login", SupplierController.loginSupplier);

export default router;
