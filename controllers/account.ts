import Account from './../models/Account';
import { HydratedDocument } from 'mongoose';
import AccountInterface from './../interfaces/Account';
import User from './../models/User';
import UserInterface from './../interfaces/User';
import StatusError from '../lib/StatusError';

export const getAccounts = async () => {
  try {
    const accounts = await Account.find({});
    if (!accounts) {
      throw new StatusError('No Account found', 404);
    }
    return accounts;
  } catch (err) {
    throw err;
  }
};
export const getAccountById = async (
  id: string,
  owner_id: string,
  role: string
) => {
  try {
    if (role === 'admin') {
      const account = await Account.findById(id);
      if (!account) {
        throw new StatusError('Account not found', 404);
      }
      return account;
    } else {
      const account = await Account.findOne({ _id: id });
      if (!account) {
        throw new StatusError('Account not found', 404);
      }
      if (account.owner_id.toString() !== owner_id) {
        throw new StatusError(
          'You are not authorized to view this account',
          403
        );
      }

      return account;
    }
  } catch (err) {
    throw err;
  }
};

export const getAccountsByUserId = async (id: string) => {
  try {
    const account = await Account.find({
      $or: [
        { owner_id: id },
        {
          shared_ids: {
            $elemMatch: {
              id: id,
            },
          },
        },
      ],
    });
    if (!account) {
      throw new StatusError('Account not found', 404);
    }
    return account;
  } catch (err) {
    throw err;
  }
};

export const getSharedAccountsByUserId = async (id: string) => {
  const account = await Account.find({ shared_ids: id });
  if (!account) {
    throw new StatusError('Account not found', 404);
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

export const deleteAccount = async ({
  id,
  owner_id,
  role,
}: {
  id: string;
  owner_id: string;
  role: string;
}): Promise<void> => {
  try {
    let deleted;
    const account = await Account.findOne({ _id: id });
    if (!account) {
      throw new StatusError('Account not found', 404);
    }
    if (role !== 'admin' && account.owner_id.toString() !== owner_id) {
      throw new StatusError(
        'You are not authorized to delete this account',
        403
      );
    }
    deleted = await account.remove();
    if (!deleted) {
      throw new StatusError('Something went wrong', 500);
    }
    return deleted;
  } catch (err) {
    throw err;
  }
};

export const shareAccount = async ({
  account_id,
  shared_accounts,
  owner_id,
  role,
}: {
  account_id: string;
  shared_accounts: { email: string; privilege: 'r' | 'rw' }[];
  owner_id: string;
  role: string;
}) => {
  const account = await Account.findById(account_id);
  if (!account) {
    throw new StatusError('Account not found', 404);
  }
  if (role !== 'admin' && account.owner_id.toString() !== owner_id) {
    throw new StatusError('You are not authorized to share this account', 403);
  }

  const users = await User.find({
    email: { $in: shared_accounts.map((user) => user.email) },
  });
  // add _id of each user to shared_users array
  const users_with_id = users.map((user) => {
    return {
      id: user._id,
      privilege: shared_accounts.find((u) => u.email === user.email)?.privilege,
    };
  });
  console.log(users);
  console.log(users_with_id);
  if (!account) {
    throw new StatusError('Account not found', 404);
  }
  if (!users) {
    throw new StatusError('User not found', 404);
  }

  account.shared_ids.push(users_with_id);
  const newAccount = await account.save();
  if (!newAccount) {
    throw new Error('Account not shared');
  }
  return newAccount;
};
