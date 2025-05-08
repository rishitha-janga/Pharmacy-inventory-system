import Router from 'express';
import * as PurchaseController from '../controllers/PurchaseController.js';

const router = Router();

router.post("/make-payment",PurchaseController.purchasePlan);
router.get("/get/all",PurchaseController.getAllPatientPayments);
router.get("/get/payment/:patientId",PurchaseController.getPaymentByPatientId);

export default router;