import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import MerchantRoutes from "./routes/MerchantRoutes.js";
import SupplierRoutes from "./routes/SuplierRoutes.js";
import MedicineRoutes from "./routes/MedicinesRoutes.js";
import RequestRoutes from "./routes/RequestRoutes.js";
import PatientRoutes from "./routes/PatientRoutes.js";
import PatientMedicineRoutes from "./routes/PatientMedincineRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import DoctorRoutes from "./routes/DoctorRoutes.js";
import Appointment from "./routes/AppointmentRoutes.js";
import SubscriptionRoutes from "./routes/SubscriptionRoutes.js";
import PurchaseRoutes from "./routes/PurchaseRoutes.js";


// Creating the app
const app = express();

app.use(express.static("./images/"));

//Middleware for the app
app.use(express.json());
app.use(cors());
dotenv.config();

//Connecting to MongoDB (DATABASE_URL is defined in dotenv)
mongoose.set("strictQuery", true);

const uri = process.env.DATABASE_URL;

const Connection = () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

Connection();

// Defining the routes
app.use("/merchants", MerchantRoutes);
app.use("/suppliers", SupplierRoutes);
app.use("/medicines", MedicineRoutes);
app.use("/requests", RequestRoutes);
app.use("/patients", PatientRoutes);
app.use("/patientMedicine", PatientMedicineRoutes);
app.use("/messages", MessageRoutes);
app.use("/users", UserRoutes);
app.use("/doctors", DoctorRoutes);
app.use("/appointment", Appointment);
app.use("/subscribe", SubscriptionRoutes);
app.use("/purchase",PurchaseRoutes);


// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
