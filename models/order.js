const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  products: [
    { 
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Object, required: true },
    },
  ],
  cashInfo: { 
    totalCash: { type: Number, required: true },
    // coupon: { type: String, required: true },
    // afterDiscount: { type: Number, required: true },
    // cashType: {type: String, required: true },
    isPaid: {type: Boolean, required: true}
  },
  date: {
    type: Date,
    required: true,
  },
  approveStatus: {
    type: Boolean,
    required: true,
  },
  hasAccountInfo: {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false }
  },
  deliveryInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    node: { type: String, required: false },
  }
});
module.exports = mongoose.model("Order", orderSchema);
