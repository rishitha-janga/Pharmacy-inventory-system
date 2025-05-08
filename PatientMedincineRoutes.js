import { Router } from "express";

import * as PatientMedicineSchema from "../controllers/PatientsMedicineController.js";

const router = Router();

router.get("/", PatientMedicineSchema.getPatientMedicines);
router.get("/patient/:patientId", PatientMedicineSchema.getPatientMedicinesByPatient);
router.post("/", PatientMedicineSchema.createPatientMedicine);
router.post("/request/:medicineId",PatientMedicineSchema.sendRefillRequest);
router.put("/deliver/:medicineId",PatientMedicineSchema.markRefillDelivered);
router.put("/:id", PatientMedicineSchema.updatePatientMedicine);
router.delete("/:id", PatientMedicineSchema.deletePatientMedicine);
router.get("/:id", PatientMedicineSchema.getPatientMedicine);

export default router;