import Account from '@models/Account';
import { HydratedDocument } from 'mongoose';
import AccountInterface from '@interfaces/Account';
import User from '@models/User';
import UserInterface from '@interfaces/User';

export const getAccountsByUserId = async (id: string) => {
  const account = await Account.find({ user_id: id });
  if (!account) {
    throw new Error('Account not found');
  }
  return account;
};

export const getSharedAccountsByUserId = async (id: string) => {
  const account = await Account.find({ shared_ids: id });
  if (!account) {
    throw new Error('Account not found');
  }
  return account;
};

//account_name: string;
//   owner_id: string;
// shared_ids:
export const createAccount = async ({
  name,
  owner_id,
}: {
  name: string;
  owner_id: string;
}) => {
  const account = new Account({
    account_name: name,
    owner_id: owner_id,
    active: true,
    shared_ids: [],
  });
  const newAccount = await account.save();
  if (!newAccount) {
    throw new Error('Account not created');
  }
  return newAccount;
};

export const shareAccount = async ({
  account_id,
  user_email,
  privilege,
}: {
  account_id: string;
  user_email: string;
  privilege: string;
}) => {
  const account = await Account.findById(account_id);
  const user = await User.findOne({ email: user_email });
  if (!account || !user) {
    throw new Error('Account not found or user not found');
  }
  account.shared_ids.push({ id: user._id, privilege: privilege });
  const newAccount = await account.save();
  if (!newAccount) {
    throw new Error('Account not shared');
  }
  return newAccount;
};
