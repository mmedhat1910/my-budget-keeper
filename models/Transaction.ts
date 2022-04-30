import Transaction from './../interfaces/Transaction';
import mongoose, { model, Schema } from 'mongoose';

const TransactionSchema = new Schema<Transaction>({
  account_id: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  payee_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  notes: {
    type: String,
    required: false,
  },
  cleared: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: true,
    enum: ['expense', 'income'],
  },
});

export default mongoose.models.Transaction ||
  model('Transaction', TransactionSchema);
