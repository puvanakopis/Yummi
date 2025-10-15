import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    _id: { type: String },

    userId: { type: String, ref: "user", required: true },

    items: [
      {
        item: { type: String, ref: "Item", required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],

    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    grandTotal: { type: Number, required: true },

    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (!this.isNew || this._id) return next();

  try {
    const lastOrder = await mongoose.models.Order
      .findOne({}, { _id: 1 })
      .sort({ _id: -1 })
      .lean()
      .exec();

    let newIdNumber = 1;
    if (lastOrder?._id) {
      const match = lastOrder._id.match(/order_(\d+)/);
      if (match) newIdNumber = parseInt(match[1], 10) + 1;
    }

    this._id = `order_${String(newIdNumber).padStart(2, "0")}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);
Order.createIndexes();

export default Order;