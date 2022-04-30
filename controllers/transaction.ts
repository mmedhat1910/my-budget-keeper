import Transaction from './../models/Transaction';

export const getTransitionsById = async (userId: string) => {
  const transactions = await Transaction.find({ user_id: userId });
  if (!transactions) {
    throw new Error('Transaction not found');
  }
  return transactions;
};
