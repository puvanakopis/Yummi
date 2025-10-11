import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  _id: { type: String },
  Name: { type: String, required: true, trim: true },
  Img: { type: String, required: true },
  desc: { type: String, required: true },
  Price: { type: Number, required: true },
  Brand: { type: String, default: "Grandmas Kitchen" },
  Flavour: { type: String, default: "Chocolate" },
  DietType: { type: String, default: "Vegetarian" },
  Weight: { type: String, default: "500ml" },
  Speciality: { type: String, default: "Low Fat, High Protein" },
  Info: { type: String, default: "No Preservatives, Gluten-Free" },
  Reviews: { type: Number, default: 0 },
  Rating: { type: Number, default: 0 },
}, { timestamps: true });

itemSchema.pre('save', async function (next) {
  if (!this.isNew || this._id) return next();

  try {
    const lastItem = await mongoose.models.Item
      .findOne({}, { _id: 1 })
      .sort({ _id: -1 })
      .lean()
      .exec();

    let newIdNumber = 1;
    if (lastItem?._id) {
      const match = lastItem._id.match(/item_(\d+)/);
      if (match) newIdNumber = parseInt(match[1], 10) + 1;
    }

    this._id = `item_${String(newIdNumber).padStart(2, '0')}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Item = mongoose.model('Item', itemSchema);
Item.createIndexes();

export default Item;