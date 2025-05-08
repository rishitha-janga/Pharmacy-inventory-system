import mongoose from "mongoose";

const subscriptionPurchaseSchema = mongoose.Schema({
  patientId: { type: mongoose.Types.ObjectId, ref: "Patient", required: true },
  planId: { type: mongoose.Types.ObjectId, ref: "SubscriptionPlan", required: true },
  pricePaid: Number,
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  transactionId: String,
  purchasedAt: { type: Date, default: Date.now },
});

const SubscriptionPurchase = mongoose.model("SubscriptionPurchase", subscriptionPurchaseSchema);
export default SubscriptionPurchase;
