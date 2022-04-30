import Category from '@interfaces/Category';
import mongoose, { model, Schema } from 'mongoose';

const CategorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
  },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
export default mongoose.models.Category || model('Category', CategorySchema);
