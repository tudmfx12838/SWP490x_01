const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  doB: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  cart: {
    items: [
      {
        _id: { type: Schema.Types.ObjectId },
        quantity: { type: Number },
        title: { type: String },
        price: { type: Number },
        imageUrl: { type: String },
      },
    ],
  },
  orderHistory: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    },
  ],
  available: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
