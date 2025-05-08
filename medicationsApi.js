import config from "./config.js";

// Get all Medications
export function getMedications() {
  return config.get("/medicines");
}

// Get Medication by id
export function getMedicationById(id) {
  return config.get(`/medicines/${id}`);
}

// Add new Medication
export function addMedication(supplier) {
  return config.post("/medicines", supplier);
}

// Update Medication
export function updateMedication(id, supplier) {
  return config.put(`/medicines/${id}`, supplier);
}

// Delete Medication
export function deleteMedication(id) {
  return config.delete(`/medicines/${id}`);
}

// ADD Merchants as per the requests
export function addMerchants(id,merchant) {
  return config.post(`/medicines/addMerchant/${id}`, merchant);
}