import { NextApiHandler } from 'next';
import {
  getAccountById,
  getAccountsByUserId,
} from '../../../controllers/account';
import StatusError from '../../../lib/StatusError';
import withAuth from '../../../middlewares/withAuth';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const account = await getAccountById(
        id as string,
        req.body.decoded._id,
        req.body.decoded.role
      );
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      return res.status(200).json(account);
    } catch (error) {
      if (error instanceof StatusError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === 'POST') {
  } else {
    return res.status(405).json({ message: 'Route not found' });
  }
};
export default withAuth(handler);
