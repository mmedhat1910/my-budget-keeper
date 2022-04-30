import { NextApiHandler } from 'next';
import { createCategory, getCategories } from '../../../controllers/category';
import StatusError from '../../../lib/StatusError';
import withAuth from '../../../middlewares/withAuth';

const handler: NextApiHandler = async (req, res) => {
  if (req.method == 'GET') {
    try {
      const categories = await getCategories(
        req.body.decoded._id,
        req.body.decoded.role
      );
      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof StatusError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method == 'POST') {
    try {
      const { category } = req.body;
      if (!category) {
        return res.status(400).json({ message: 'Please provide category' });
      }
      await createCategory({
        category_name: category.name,
        user_id: req.body.decoded._id,
      });
      return res.status(201).json({ message: 'Category created' });
    } catch (error) {
      if (error instanceof StatusError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: (error as Error).message });
    }
  } else {
    return res.status(405).json({ message: 'Route not found' });
  }
};

export default withAuth(handler);
