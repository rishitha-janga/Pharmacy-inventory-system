import { Router } from "express";
import * as MedicineController from "../controllers/MedicinesController.js";
const router = Router();

import multer from "multer";

const STORAGE = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images/medicine");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        "NQI" +
        Date.now() +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const UPLOAD = multer({ storage: STORAGE });

router.get("/", MedicineController.getMedicines);
router.post("/", UPLOAD.single("image"), MedicineController.createMedicine);
router.put("/:id", MedicineController.updateMedicine);
router.delete("/:id", MedicineController.deleteMedicine);
router.get("/:id", MedicineController.getMedicine);
router.post("/addMerchant/:id", MedicineController.addMerchantInMedicine);
router.post("/removeMerchant/:id", MedicineController.removeMerchantInMedicine);

export default router;
