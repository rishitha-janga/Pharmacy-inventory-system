import Router from 'express';
import * as Appointment from '../controllers/AppointmentController.js';


const router = Router();

router.get("/admin", Appointment.getAppointments);
router.post("/", Appointment.createAppointment);
router.put("/:id", Appointment.updateAppointment);
router.delete("/:id", Appointment.deleteAppointment);
router.get("/user/:id", Appointment.getAppointmentuser);
router.get("/doctor/:id", Appointment.getDoctorAppointments);


export default router;