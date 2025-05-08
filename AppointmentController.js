import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";


// for admin
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate([
        {
          '$lookup': {
            'from': 'doctors',  
            'localField': 'doctor', 
            'foreignField': '_id',  
            'as': 'doctors'  
          }
        },
        {
          '$lookup': {
            'from': 'patients',  // The collection you're looking up from
            'localField': 'patient',  // The field in the Appointment collection
            'foreignField': '_id',   // The field in the 'patients' collection
            'as': 'patient'   // The alias where the result will be stored
          }
        }
      ]);
      
    console.log(appointments,"dvgjopjs");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



// for user 
export const getAppointmentuser = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.aggregate([
        {
          $match: { patient: new mongoose.Types.ObjectId(id) }
        },
        {
            '$lookup': {
              'from': 'doctors',  
              'localField': 'doctor', 
              'foreignField': '_id',  
              'as': 'doctors'  
            }
          },
        
    ])
    console.log(appointment,"dvgjopjs");

    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



// for doctor
export const getDoctorAppointments = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.aggregate([
        {
          $match: { doctor: new mongoose.Types.ObjectId(id) }
        },
        {
            '$lookup': {
              'from': 'patients',  // The collection you're looking up from
              'localField': 'patient',  // The field in the Appointment collection
              'foreignField': '_id',   // The field in the 'patients' collection
              'as': 'patient'   // The alias where the result will be stored
            }
          }
    ]);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};



// create appointment
export const createAppointment = async (req, res) => {
  const appointment = req.body;
  const newAppointment = new Appointment(appointment);
  try {
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



// update appointment   
export const updateAppointment = async (req, res) => {
  const { id: _id } = req.params;
  const appointment = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No appointment with id: ${_id}`);
  const updatedAppointment = await Appointment.findByIdAndUpdate(_id, appointment, { new: true });
  res.json(updatedAppointment);
}



// delete appointment
export const deleteAppointment = async (req, res) => {
    
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No appointment with id: ${_id}`);
  await Appointment.findByIdAndRemove(_id);
  res.json({ message: "Appointment deleted successfully." });

}