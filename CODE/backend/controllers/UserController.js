import mongoose from "mongoose";
import Users from "../models/Users.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  const newUser = new Users(user);

  try {
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  const updateUser = await Users.findByIdAndUpdate(
    _id,
    { ...user, _id },
    { new: true }
  );

  res.json(updateUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");

  await Users.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully" });
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");

  const user = await Users.findById(id);

  res.json(user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    if (password !== user.password)
      return res.status(404).json({ message: "Invalid credentials" });

    res.status(200).json({
      result: user._id,
      roles: user.roles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
