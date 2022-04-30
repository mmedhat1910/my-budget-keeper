import StatusError from '../lib/StatusError';
import Category from './../models/Category';

export const getCategories = async (userId: string, role: string) => {
  try {
    if (role === 'admin') {
      const categories = await Category.find({});
      if (!categories) {
        throw new StatusError('Categories not found', 404);
      }
      return categories;
    } else {
      const categories = await Category.find({ user_id: userId });
      if (!categories) {
        throw new StatusError('Categories not found', 404);
      }
      return categories;
    }
  } catch (err) {
    throw err;
  }
};

export const createCategory = async ({
  category_name,
  user_id,
}: {
  category_name: string;
  user_id: string;
}) => {
  try {
    const category = await Category.create({
      name: category_name,
      user_id,
    });
    return category;
  } catch (err) {
    throw err;
  }
};
