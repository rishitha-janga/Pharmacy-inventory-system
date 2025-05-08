import config from "./config.js";

// Get all Users
export function getAppointments() {
  return config.get("/appointment/admin");
}

// Get User by id
export function getAppointmentByUserId(id) {
  return config.get(`/appointment/user/${id}`);
}
export function getAppointmentByDoctorId(id) {
  return config.get(`/appointment/doctor/${id}`);
}

// Add new User
export function bookAppointment(User) {
  return config.post("/appointment", User);
}

// Update User
export function updateAppointment(id,status) {
  return config.put(`/appointment/${id}`, {status:status});
}

// Delete User
export function deleteAppointment(id) {
  return config.delete(`/appointment/${id}`);
}
