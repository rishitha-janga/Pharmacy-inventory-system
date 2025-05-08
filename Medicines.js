import mongoose from "mongoose";

const medicineSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  expiryDate: {
    type: Date,
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "requested", "declined", "delivered"],
    default: "pending"
  },
  
  renewalReminderDate: Date,
  users: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  merchant: {
    type: Array,
    default: [],
  },

  refill: {
    requested: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["none", "pending", "accepted", "declined", "delivered"],
      default: "none",
    },
  }
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
