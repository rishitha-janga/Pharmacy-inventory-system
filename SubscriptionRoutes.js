import Router from 'express';
import * as SubscriptionController from '../controllers/SubscriptionController.js';

const router = Router();

router.post("/create-plan", SubscriptionController.createPlan);               
router.get("/get/plans", SubscriptionController.getPlans);                   
router.get("/get/plan/:id", SubscriptionController.getPlanById);             
router.put("/update/plan/:id", SubscriptionController.updatePlanById);       
router.delete("/delete/plan/:id", SubscriptionController.deletePlanById);

export default router;
