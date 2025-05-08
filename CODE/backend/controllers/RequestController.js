import mongoose from "mongoose";
import Request from "../models/Requests.js";

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRequest = async (req, res) => {
  const request = req.body;
  const newRequest = new Request(request);
  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRequest = async (req, res) => {
  const { id: _id } = req.params;
  const request = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Request with that id");

  try {
    const updateRequest = await Request.findByIdAndUpdate(
      _id,
      { ...request, _id },
      { new: true }
    );

    res.status(200).json(updateRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Request with that id");

  try {
    await Request.findByIdAndRemove(id);
    res.json({ message: "Request deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Request with that id");

  try {
    const request = await Request.findById(id);
    res.status(200).json(request);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
