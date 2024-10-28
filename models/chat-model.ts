import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.chats) {
  delete mongoose.models.chats;
}

const chatModel = mongoose.model("chats", chatSchema);

export default chatModel;
