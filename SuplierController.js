import mongoose from "mongoose";
import Supplier from "../models/Suppliers.js";

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  const supplier = req.body;

  const newSupplier = new Supplier(supplier);

  try {
    await newSupplier.save();

    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const { id: _id } = req.params;
  const supplier = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No supplier with that id");

  try {
    const updateSupplier = await Supplier.findByIdAndUpdate(
      _id,
      { ...supplier, _id },
      { new: true }
    );

    res.status(200).json(updateSupplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No supplier with that id");

  await Supplier.findByIdAndRemove(id);

  res.json({ message: "Supplier deleted successfully" });
};

export const getSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No supplier with that id");

  const supplier = await Supplier.findById(id);

  res.json(supplier);
};

export const loginSupplier = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Supplier.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    if (password !== user.password)
      return res.status(404).json({ message: "Invalid credentials" });

    res.status(200).json({ result: user._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
