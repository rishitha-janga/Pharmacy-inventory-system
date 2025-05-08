import config from "./config.js";

// Get all merchants
export function getMerchants() {
  return config.get("/merchants");
}

// Get merchant by id
export function getMerchantById(id) {
  return config.get(`/merchants/${id}`);
}

// Add new merchant
export function addMerchant(merchant) {
  return config.post("/merchants", merchant);
}

// Update merchant
export function updateMerchant(merchant) {
  return config.put(`/merchants/${merchant.id}`, merchant);
}

// Delete merchant
export function deleteMerchant(id) {
  return config.delete(`/merchants/${id}`);
}
