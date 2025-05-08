import config from "./config.js";

// Get all PatientsMedicine
export function getPatientsMedicine() {
  return config.get("/patientMedicine");
}

// Get PatientsMedicine by id
export function getPatientsMedicineById(id) {
  return config.get(`/patientMedicine/${id}`);
}

// Add new PatientsMedicine
export function addPatientsMedicine(patient) {
  return config.post("/patientMedicine", patient);
}

// Update PatientsMedicine
export function updatePatientsMedicine(patient) {
  return config.put(`/patientMedicine/${patient.id}`, patient);
}

// Delete PatientsMedicine
export function deletePatientsMedicine(id) {
  return config.delete(`/patientMedicine/${id}`);
}
