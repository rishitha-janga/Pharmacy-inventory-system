import mongoose from "mongoose";
import Merchant from "../models/Merchants.js";

export const getMechants = async (req, res) => {
  try {
    const merchants = await Merchant.find();

    res.status(200).json(merchants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMerchant = async (req, res) => {
  const merchant = req.body;

  const newMerchant = new Merchant(merchant);

  try {
    await newMerchant.save();

    res.status(201).json(newMerchant);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateMerchant = async (req, res) => {
  const { id: _id } = req.params;
  const merchant = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No merchant with that id");

  const updateMerchant = await Merchant.findByIdAndUpdate(
    _id,
    { ...merchant, _id },
    { new: true }
  );

  res.json(updateMerchant);
};

export const deleteMerchant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No merchant with that id");

  await Merchant.findByIdAndRemove(id);

  res.json({ message: "Merchant deleted successfully" });
};

export const getMerchant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No merchant with that id");

  const merchant = await Merchant.findById(id);

  res.json(merchant);
};

export const loginMerchant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Merchant.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    if (password !== user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ result: user._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const registerMerchant = async (req, res) => {

//     const { name, email, password, phone, address } = req.body;

//     try {

//         const user = await Merchant.findOne({ email });

//         if (user) return res.status(400).json({ message: "User already exists" });

//         const result = await Merchant.create({ name, email, password, phone, address });

//         res.status(201).json({ result });

//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

// export const getMerchantProducts = async (req, res) => {

//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//     const merchant = await Merchant.findById(id);

//     res.json(merchant.products);
// }

// export const addMerchantProduct = async (req, res) => {

//         const { id } = req.params;
//         const product = req.body;

//         if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//         const merchant = await Merchant.findById(id);

//         merchant.products.push(product);

//         await merchant.save();

//         res.json(merchant);
//     }

// export const updateMerchantProduct = async (req, res) => {

//     const { id, productId } = req.params;
//     const product = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//     const merchant = await Merchant.findById(id);

//     const index = merchant.products.findIndex((product) => product._id === productId);

//     merchant.products[index] = product;

//     await merchant.save();

//     res.json(merchant);
// }

// export const deleteMerchantProduct = async (req, res) => {

//     const { id, productId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//     const merchant = await Merchant.findById(id);

//     const index = merchant.products.findIndex((product) => product._id === productId);

//     merchant.products.splice(index, 1);

//     await merchant.save();

//     res.json(merchant);
// }

// export const getMerchantOrders = async (req, res) => {

//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//     const merchant = await Merchant.findById(id);

//     res.json(merchant.orders);
// }

// export const addMerchantOrder = async (req, res) => {

//             const { id } = req.params;
//             const order = req.body;

//             if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//             const merchant = await Merchant.findById(id);

//             merchant.orders.push(order);

//             await merchant.save();

//             res.json(merchant);
//         }

// export const updateMerchantOrder = async (req, res) => {

//         const { id, orderId } = req.params;
//         const order = req.body;

//         if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//         const merchant = await Merchant.findById(id);

//         const index = merchant.orders.findIndex((order) => order._id === orderId);

//         merchant.orders[index] = order;

//         await merchant.save();

//         res.json(merchant);
//     }

// export const deleteMerchantOrder = async (req, res) => {

//     const { id, orderId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No merchant with that id");

//     const merchant = await Merchant.findById(id);

//     const index = merchant.orders.findIndex((order) => order._id === orderId);

//     merchant.orders.splice(index, 1);

//     await merchant.save();

//     res.json(merchant);
// }
