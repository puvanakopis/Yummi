import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  autoIndex: false
});

userSchema.pre('save', async function (next) {
  if (!this.isNew || this._id) {
    return next();
  }

  try {
    const lastUser = await mongoose.models.user
      .findOne({}, { _id: 1 })
      .sort({ _id: -1 })
      .lean()
      .exec();

    let newIdNumber = 1;
    if (lastUser?._id) {
      const match = lastUser._id.match(/user_(\d+)/);
      if (match) {
        newIdNumber = parseInt(match[1], 10) + 1;
      }
    }

    this._id = `user_${String(newIdNumber).padStart(2, '0')}`;
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model('user', userSchema);

userModel.createIndexes();

export default userModel;