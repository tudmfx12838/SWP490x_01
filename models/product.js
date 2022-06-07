const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  mount: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model("Product", productSchema);