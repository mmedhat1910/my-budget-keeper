import { NextApiHandler } from 'next';
import {
  deleteAccount,
  getAccountById,
  getAccountsByUserId,
} from '../../../../controllers/account';
import StatusError from '../../../../lib/StatusError';
import withAuth from '../../../../middlewares/withAuth';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const account = await getAccountById(
        id as string,
        req.body.decoded._id,
        req.body.decoded.role
      );
    } catch (error) {
      if (error instanceof StatusError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === 'POST') {
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await deleteAccount({
        id: id as string,
        owner_id: req.body.decoded._id,
        role: req.body.decoded.role,
      });

      return res.status(200).json({ message: 'Account deleted' });
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
