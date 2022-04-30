import Category from './../models/Category';

export const getCategoriesById = async (userId: string) => {
  const categories = await Category.find({ user_id: userId });
  if (!categories) {
    throw new Error('Category not found');
  }
  return categories;
};

export const addCategory = async ({
  category_name,
  user_id,
}: {
  category_name: string;
  user_id: string;
}) => {
  const category = new Category({
    category_name: category_name,
    user_id: user_id,
  });
  const newCategory = await category.save();
  if (!newCategory) {
    throw new Error('Category not created');
  }
  return newCategory;
};
