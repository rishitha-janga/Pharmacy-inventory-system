import mongoose from "mongoose";

const subscriptionPlanSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  durationDays: { type: Number, required: true }, // e.g., 30
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

export default SubscriptionPlan;
