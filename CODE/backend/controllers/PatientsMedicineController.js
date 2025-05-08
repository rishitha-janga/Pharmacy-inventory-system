import mongoose from "mongoose";
import PatientMedicine from "../models/PatientsMedicine.js";

export const getPatientMedicines = async (req, res) => {
  try {
    const patientMedicines = await PatientMedicine.find();
    res.status(200).json(patientMedicines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPatientMedicine = async (req, res) => {
  const patientMedicine = req.body;
  const newPatientMedicine = new PatientMedicine(patientMedicine);
  try {
    await newPatientMedicine.save();
    res.status(201).json(newPatientMedicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPatientMedicinesByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patientMedicines = await PatientMedicine.find({ patient: patientId })
      .populate("patient", "name email")
      .populate({
        path: "medicine", // Refers to Request
        populate: {
          path: "medicine", // Refers to actual Medicine inside Request
          model: "Medicine",
          select: "name description price image durationDays"
        }
      })
      .populate("users", "name email");

    if (!patientMedicines || patientMedicines.length === 0) {
      return res
        .status(404)
        .json({ message: "No medicines found for this patient" });
    }

    res.status(200).json(patientMedicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendRefillRequest = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { merchantId } = req.body;

    const updated = await PatientMedicine.findByIdAndUpdate(
      medicineId,
      {
        refill: {
          requested: true,
          status: "pending",
          merchantId,
          refillDate: new Date()
        }
      },
      { new: true }
    );

    res.status(200).json({ message: "Refill request sent", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markRefillDelivered = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const updated = await PatientMedicine.findByIdAndUpdate(
      medicineId,
      { "refill.status": "delivered" },
      { new: true }
    );

    res.status(200).json({ message: "Medicine delivered", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatientMedicine = async (req, res) => {
  const { id: _id } = req.params;
  const patientMedicine = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Medicine with that id");

  try {
    const updatePatientMedicine = await PatientMedicine.findByIdAndUpdate(
      _id,
      { ...patientMedicine, _id },
      { new: true }
    );

    res.status(200).json(updatePatientMedicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePatientMedicine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Medicine with that id");

  try {
    await PatientMedicine.findByIdAndRemove(id);
    res.json({ message: "Medicine deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPatientMedicine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Medicine with that id");

  try {
    const patientMedicine = await PatientMedicine.findById(id);
    res.status(200).json(patientMedicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
