import User from './../interfaces/User';
import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: false,
    default: null,
  },
  role: {
    type: String,
    required: false,
    default: 'user',
    enum: ['admin', 'user'],
  },
});

export default mongoose.models.User || model('User', UserSchema);
