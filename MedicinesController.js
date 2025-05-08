import mongoose from "mongoose";
import Medicine from "../models/Medicines.js";

export const getMedicines = async (req, res) => {
  try {
    const medicine = await Medicine.find();
    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMedicine = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      const medicine = req.body;

      const newMedicine = new Medicine(medicine);
      await newMedicine.save();

      res.status(201).json(newMedicine);
    } else {
      const medicine = req.body;

      const newMedicine = new Medicine(medicine);
      await newMedicine.save();

      res.status(201).json(newMedicine);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMedicine = async (req, res) => {
  const { id: _id } = req.params;
  const medicine = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Medicine with that id");

  try {
    const updateMedicine = await Medicine.findByIdAndUpdate(
      _id,
      { ...medicine, _id },
      { new: true }
    );

    res.status(200).json(updateMedicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Medicine with that id");

  await Medicine.findByIdAndRemove(id);

  res.json({ message: "Medicine deleted successfully" });
};

export const getMedicine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Medicine with that id");

  const medicine = await Medicine.findById(id);

  res.json(medicine);
};

export const addMerchantInMedicine = async (req, res) => {
  const { id } = req.params;
  const { merchantId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Medicine with that id");

  try {
    const medicine = await Medicine.findById(id);
    medicine.merchant.push(merchantId);
    await medicine.save();
    res.status(200).json(medicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const removeMerchantInMedicine = async (req, res) => {
  const { id } = req.params;
  const { merchantId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Medicine with that id");

  try {
    const medicine = await Medicine.findById(id);
    const index = medicine.merchant.indexOf(merchantId);
    medicine.merchant.splice(index, 1);
    await medicine.save();
    res.status(200).json(medicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
