import { NextApiHandler } from 'next';
import {
  createTransaction,
  getTransitions,
} from '../../../controllers/transaction';
import StatusError from '../../../lib/StatusError';
import withAuth from '../../../middlewares/withAuth';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const transactions = await getTransitions(
        req.body.decoded._id,
        req.body.decoded.role
      );
      return res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof StatusError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === 'POST') {
    try {
      const { transaction } = req.body;
      if (!transaction) {
        return res.status(400).json({ message: 'Please provide transaction' });
      }
      await createTransaction({
        ...transaction,
        payer_id: req.body.decoded._id,
      });
      return res.status(201).json({ message: 'Transaction created' });
    } catch (error) {
      if (error instanceof StatusError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default withAuth(handler);
