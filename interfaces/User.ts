import mongoose from 'mongoose';
export default interface User {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: 'user' | 'admin';
}
