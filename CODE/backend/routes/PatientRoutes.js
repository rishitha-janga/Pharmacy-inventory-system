import { Router } from "express";
import * as PatientsController from "../controllers/PatientsControllers.js";
const router = Router();

router.get("/", PatientsController.getPatients);
router.post("/", PatientsController.createPatients);
router.put("/:id", PatientsController.updatePatients);
router.delete("/:id", PatientsController.deletePatients);
router.get("/:id", PatientsController.getPatients);
router.post("/login", PatientsController.loginPatients);

export default router;
