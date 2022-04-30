import { NextApiHandler } from 'next';
import withAuth from '../../../middlewares/withAuth';
import Account from '../../../models/Account';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const accounts = await Account.find();
      if (!accounts) {
        return res.status(404).json({ message: 'No accounts found' });
      }
      return res.status(200).json({ accounts });
    } else if (req.method === 'POST') {
      const account = req.body.account;
      if (!account) {
        return res.status(400).json({
          message: 'Please provide account with account_name & owner_id',
        });
      }
      const newAccount = await Account.create(account);
      return res
        .status(201)
        .json({ message: 'Account created', account: newAccount });
    }
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

export default withAuth(handler);
