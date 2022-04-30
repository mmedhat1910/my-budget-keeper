import mongoose from 'mongoose';

export default interface Transaction {
  _id: mongoose.ObjectId;
  account_id: mongoose.ObjectId;
  date: mongoose.Date;
  amount: number;
  category_id: mongoose.ObjectId;
  payer_id: mongoose.ObjectId;
  notes: string;
  cleared: boolean;
  type: 'expense' | 'income';
}
