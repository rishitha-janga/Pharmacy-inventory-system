import mongoose from "mongoose";
import SubscriptionPlan from "../models/SubscriptionPlan.js";

export const createPlan = async (req, res) => {
  try {
    const { name, description, durationDays, price } = req.body;
    const plan = new SubscriptionPlan({
      name,
      description,
      durationDays,
      price,
    });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findById(id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, durationDays, price } = req.body;

    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      id,
      { name, description, durationDays, price },
      { new: true }
    );

    if (!updatedPlan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SubscriptionPlan.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


