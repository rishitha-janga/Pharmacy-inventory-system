import mongoose from "mongoose";
import Patients from "../models/Patients.js";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  await Patients.updateMany(
    { "subscription.endDate": { $lt: today } },
    { $set: { "subscription.isActive": false } }
  );
});

export const getPatients = async (req, res) => {
  try {
    const patients = await Patients.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPatients = async (req, res) => {
  const patient = req.body;

  const newPatients = new Patients(patient);

  try {
    await newPatients.save();

    res.status(201).json(newPatients);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePatients = async (req, res) => {
  const { id: _id } = req.params;
  const patient = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Patients with that id");

  try {
    const updatePatients = await Patients.findByIdAndUpdate(
      _id,
      { ...patient, _id },
      { new: true }
    );

    res.status(200).json(updatePatients);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePatients = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Patients with that id");

  await Patients.findByIdAndRemove(id);

  res.json({ message: "Patients deleted successfully" });
};

export const getPatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Patients with that id");

  const patient = await Patients.findById(id);

  res.json(patient);
};

export const loginPatients = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patients.findOne({ email });

    if (!patient) return res.status(404).json({ message: "Patients doesn't exist" });

    if (password !== patient.password)
      return res.status(404).json({ message: "Invalid credentials" });

    res.status(200).json({ result: patient._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
