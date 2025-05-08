import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
