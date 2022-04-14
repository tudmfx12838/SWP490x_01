const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
	  totalCash: { type: Number, required: true },
    },
  ],
  date: {
	type: Date,
    required: true
  },
  approveStatus: {
	type: Boolean,
    required: true
  },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
});
module.exports = mongoose.model("Order", orderSchema);