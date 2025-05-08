import mongoose from "mongoose";
import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const message = req.body;
  const newMessage = new Message(message);
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// sender and receiver can be merchants or suppliers
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMessage = async (req, res) => {
  const { id: _id } = req.params;
  const message = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Message with that id");

  try {
    const updateMessage = await Message.findByIdAndUpdate(
      _id,
      { ...message, _id },
      { new: true }
    );

    res.status(200).json(updateMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Message with that id");

  try {
    await Message.findByIdAndRemove(id);
    res.json({ message: "Message deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Message with that id");

  try {
    const message = await Message.findById(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
