import config from "./config.js";

// Get all suppliers
export function getSuppliers() {
  return config.get("/suppliers");
}

// Get supplier by id
export function getSupplierById(id) {
  return config.get(`/suppliers/${id}`);
}

// Add new supplier
export function addSupplier(supplier) {
  return config.post("/suppliers", supplier);
}

// Update supplier
export function updateSupplier(supplier) {
  return config.put(`/suppliers/${supplier.id}`, supplier);
}

// Delete supplier
export function deleteSupplier(id) {
  return config.delete(`/suppliers/${id}`);
}
