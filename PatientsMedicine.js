import mongoose from "mongoose";

const PatientMedicineSchema = mongoose.Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  medicine: {
    type: mongoose.Types.ObjectId,
    ref: "Request",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // merchant: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Merchants",
  //   required: true,
  // },
  users: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  paymentDate: {
    type: Date,
    default: new Date(),
  },
  refill: {
    requested: { type: Boolean, default: false },
    status: { type: String, enum: ["none", "pending", "accepted", "declined", "delivered"], default: "none" },
    merchantId: { type: mongoose.Types.ObjectId, ref: "Merchant" },
    refillDate: Date
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PatientMedincine = mongoose.model(
  "PatientMedincine",
  PatientMedicineSchema
);

export default PatientMedincine;
