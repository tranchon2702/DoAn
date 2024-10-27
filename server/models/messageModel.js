const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: false }, // Tin nhắn văn bản có thể không bắt buộc
      image: { type: String, required: false }, // Lưu base64 của hình ảnh// Lưu trữ hình ảnh dưới dạng chuỗi base64, mặc định là null nếu không có ảnh
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
