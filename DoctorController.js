import mongoose from "mongoose";
// import Users from "../models/Users.js";
import Doctors from "../models/Doctors.js";

export const getDoctors = async (req, res) => {
  try {
    const users = await Doctors.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const {email}=req.body;

  const newUser = new Doctors(user);

  try {
    const existingUser = await Doctors.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    } if (req.file) {
      req.body.image = req.file.filename;
      const medicine = req.body;

      const newMedicine = new Doctors(medicine);
      await newMedicine.save();

      res.status(201).json(newMedicine);
    }
    
    else{
       await newUser.save();

    res.status(201).json(newUser);
    }
   
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Doctor with that id");

  const updateUser = await Doctors.findByIdAndUpdate(
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

  await Doctors.findByIdAndRemove(id);

  res.json({ message: "Doctor deleted successfully" });
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No doctor with that id");

  const user = await Doctors.findById(id);

  res.json(user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Doctors.findOne({ email });

    if (!user) return res.status(404).json({ message: "Doctors doesn't exist" });

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
