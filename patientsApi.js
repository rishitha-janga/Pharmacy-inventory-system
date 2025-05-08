import config from "./config.js";

// Get all Patients
export function getPatients() {
  return config.get("/patients");
}

// Get Patients by id
export function getPatientsById(id) {
  return config.get(`/patients/${id}`);
}

// Add new Patients
export function addPatients(patient) {
  return config.post("/patients", patient);
}

// Update Patients
export function updatePatients(patient) {
  return config.put(`/patients/${patient.id}`, patient);
}

// Delete Patients
export function deletePatients(id) {
  return config.delete(`/patients/${id}`);
}
