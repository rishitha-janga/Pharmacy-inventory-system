import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  
image:String,
  phone: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Doctors = mongoose.model("Doctors", doctorSchema);

export default Doctors;
