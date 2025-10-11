import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this._id) {
    const count = await mongoose.models.user.countDocuments();
    this._id = `user_${String(count + 1).padStart(2, '0')}`;
  }
  next();
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;