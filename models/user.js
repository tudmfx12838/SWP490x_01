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
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  point: {
	type: Number,
    required: true
  },
  cart: {
    items: [
      { //Add relation with Product
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);