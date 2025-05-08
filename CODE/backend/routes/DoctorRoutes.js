import { Router } from "express";
import * as DoctorController from "../controllers/DoctorController.js";
const router = Router();
import multer from "multer";

const STORAGE = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images/doctors");
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

router.get("/", DoctorController.getDoctors);
router.post("/",UPLOAD.single("image"), DoctorController.createUser);
router.put("/:id", DoctorController.updateUser);
router.delete("/:id", DoctorController.deleteUser);
router.get("/:id", DoctorController.getUser);
router.post("/login", DoctorController.loginUser);

export default router;
