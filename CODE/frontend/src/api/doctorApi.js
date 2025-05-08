import config from "./config.js";

// Get all Users
export function getUsers() {
  return config.get("/doctors/");
}

// Get User by id
export function getUserById(id) {
  return config.get(`/doctors/${id}`);
}

// Add new User
export function addUser(User) {
  return config.post("/doctors", User);
}

// Update User
export function updateUser(User) {
  return config.put(`/doctors/${User.id}`, User);
}

// Delete User
export function deleteUser(id) {
  return config.delete(`/doctors/${id}`);
}
