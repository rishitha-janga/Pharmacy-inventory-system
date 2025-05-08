import Patient from "../models/Patients.js";
import SubscriptionPlan from "../models/SubscriptionPlan.js";
import SubscriptionPurchase from "../models/SubscriptionPurchase.js";

export const purchasePlan = async (req, res) => {
    try {
      const { patientId, planId, transactionId } = req.body;
  
      const plan = await SubscriptionPlan.findById(planId);
      if (!plan) return res.status(404).json({ message: "Plan not found" });
  
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + plan.durationDays);
  
      // Update patient subscription
      await Patient.findByIdAndUpdate(patientId, {
        subscription: {
          isActive: true,
          planId,
          startDate,
          endDate,
        },
      });
  
      // Record purchase
      const purchase = new SubscriptionPurchase({
        patientId,
        planId,
        pricePaid: plan.price,
        transactionId,
        paymentStatus: "paid",
      });
  
      await purchase.save();
  
      res.status(200).json({ message: "Subscription purchased successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getPaymentByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      const purchases = await SubscriptionPurchase.find({ patientId })
        .populate("planId", "name price durationDays")
        .populate("patientId", "name email")
        .sort({ purchasedAt: -1 });
  
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getAllPatientPayments = async (req, res) => {
    try {
      const purchases = await SubscriptionPurchase.find()
        .populate("patientId", "name email") // optional: patient info
        .populate("planId", "name price durationDays")
        .sort({ purchasedAt: -1 });
  
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  