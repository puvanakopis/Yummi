import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  item: {
    type: String,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
  if (!this._id) {
    this._id = this.userId;
  }
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
Cart.createIndexes();

export default Cart;