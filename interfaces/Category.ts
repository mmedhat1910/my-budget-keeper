import mongoose from 'mongoose';
export default interface Category {
  _id: mongoose.ObjectId;
  name: string;
  user_id: mongoose.ObjectId;
}
