import mongoose from 'mongoose';
export default interface Account {
  _id: mongoose.ObjectId;
  account_name: string;
  owner_id: string;
  active: boolean;
  shared_ids: { id: mongoose.ObjectId; privilege: 'r' | 'rw' }[];
}
