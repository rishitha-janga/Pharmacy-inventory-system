import config from "./config.js";

// Get all messages
export function getMessages() {
  return config.get("/messages");
}

// Get message by id
export function getMessageById(id) {
  return config.get(`/messages/${id}`);
}

// Add new message
export function addMessage(message) {
  return config.post("/messages", message);
}
