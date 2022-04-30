import Account from './../interfaces/Account';
import mongoose, { model, Schema } from 'mongoose';

const AccountSchema = new Schema<Account>({
  account_name: {
    type: String,
    required: true,
  },
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  shared_ids: {
    type: [
      {
        id: Schema.Types.ObjectId,
        privilege: {
          type: String,
          required: false,
          default: 'r',
          enum: ['r', 'rw'],
        },
      },
    ],
    ref: 'User',
    required: false,
  },
});

export default mongoose.models.Account || model('Account', AccountSchema);
