import mongoose from "mongoose";

const favouriteItemSchema = new mongoose.Schema({
  item: {
    type: String,
    ref: "Item",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const favouriteSchema = new mongoose.Schema(
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
    items: [favouriteItemSchema],
  },
  { timestamps: true }
);

favouriteSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = this.userId;
  }
  next();
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
Favourite.createIndexes();

export default Favourite;