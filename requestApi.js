import config from "./config.js";

// Get all Requests
export function getRequests() {
  return config.get("/requests");
}

// Get Request by id
export function getRequestById(id) {
  return config.get(`/requests/${id}`);
}

// Add new Request
export function addRequest(request) {
  return config.post("/requests", request);
}

// Update Request
export function updateRequest(id, request) {
  return config.put(`/requests/${id}`, request);
}

// Delete Request
export function deleteRequest(id) {
  return config.delete(`/requests/${id}`);
}
