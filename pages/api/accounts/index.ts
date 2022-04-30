import { NextApiHandler } from 'next';
import withAuth from '../../../middlewares/withAuth';
import Account from '../../../models/Account';
import AccountInterface from '../../../interfaces/Account';
import { getAccounts, getAccountsByUserId } from '../../../controllers/account';
const handler: NextApiHandler = async (req, res) => {
  try {
    const decodedToken = req.body.decoded;
    console.log(decodedToken);
    if (req.method === 'GET') {
      let accounts: AccountInterface[];
      if (decodedToken.role === 'admin') {
        accounts = await getAccounts();
      } else {
        accounts = await getAccountsByUserId(decodedToken._id);
      }
      if (!accounts) {
        return res.status(404).json({ message: 'No accounts found' });
      }
      return res.status(200).json(accounts);
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
