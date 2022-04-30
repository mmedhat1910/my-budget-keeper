import { NextApiHandler } from 'next';
import { getAccountById, shareAccount } from '../../../../controllers/account';
import StatusError from '../../../../lib/StatusError';
import withAuth from '../../../../middlewares/withAuth';
import Account from '../../../../models/Account';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      const { shared_accounts } = req.body;
      if (!shared_accounts) {
        return res.status(400).json({
          message: 'Please provide shared_accounts',
        });
      }

      await shareAccount({
        account_id: id as string,
        shared_accounts,
        owner_id: req.body.decoded._id,
        role: req.body.decoded.role,
      });

      return res.status(200).json({ message: 'Account shared' });
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
