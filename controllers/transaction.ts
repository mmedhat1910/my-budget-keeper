import Transaction from '../interfaces/Transaction';
import StatusError from '../lib/StatusError';
import TransactionModel from './../models/Transaction';

export const getTransitions = async (userId: string, role: string) => {
  try {
    if (role === 'admin') {
      const transactions = await TransactionModel.find({});
      if (!transactions) {
        throw new StatusError('Transactions not found', 404);
      }
      return transactions;
    } else {
      const transactions = await TransactionModel.find({ user_id: userId });
      if (!transactions) {
        throw new StatusError('Transactions not found', 404);
      }
      return transactions;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * account_id
date
amount
category_id
payer_id
notes
cleared
type
 */
export const createTransaction = async (transaction: Transaction) => {
  try {
    const newTransaction = await TransactionModel.create(transaction);
    if (!newTransaction) {
      throw new StatusError('Transaction not created', 500);
    }

    return newTransaction;
  } catch (err) {
    throw err;
  }
};
