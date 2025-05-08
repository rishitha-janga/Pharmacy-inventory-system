import config from "./config.js";

// Get all Users
export function getUsers() {
  return config.get("/users");
}

// Get User by id
export function getUserById(id) {
  return config.get(`/users/${id}`);
}

// Add new User
export function addUser(User) {
  return config.post("/users", User);
}

// Update User
export function updateUser(User) {
  return config.put(`/users/${User.id}`, User);
}

// Delete User
export function deleteUser(id) {
  return config.delete(`/users/${id}`);
}
