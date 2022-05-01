import { getCookie, getCookies } from 'cookies-next';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import { getTransitions } from '../../controllers/transaction';
import jwt from 'jsonwebtoken';
import StatusError from '../../lib/StatusError';
import Transaction from '../../interfaces/Transaction';
import { HydratedDocument } from 'mongoose';
interface TransactionProps {
  transactions: Omit<any, never>[];
  status: number;
  error?: string;
}
const Transactions: NextPage<TransactionProps> = ({
  error,
  status,
  transactions,
}) => {
  if (status !== 200) {
    return (
      <Layout>
        <p className="text-xl">{error ? error : 'Something went wrong'}</p>
      </Layout>
    );
  }
  if (transactions.length === 0) {
    return (
      <Layout>
        <p className="text-xl">No transactions found</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>Transactions</div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id.toString()}>
            <p>{transaction.amount}</p>
            <p>{transaction.notes}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { token } = ctx.req.cookies;
    if (!token) {
      return {
        redirect: {
          destination: '/auth/login',
        },
        props: {},
      };
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
      return {
        redirect: {
          destination: '/auth/login',
        },
        props: {
          status: 401,
          transactions: [],
        },
      };
    }
    const { id, role } = decoded as any;

    const transactions = await getTransitions(id, role);
    console.log(transactions);

    if (!transactions) {
      return {
        props: {
          status: 500,
          error: 'Something went wrong',
          transactions: [],
        },
      };
    }
    return {
      props: {
        status: 200,
        transactions: JSON.stringify(transactions),
      },
    };
  } catch (error) {
    if (error instanceof StatusError) {
      return {
        props: {
          status: error.status,
          error: error.message,
          transitions: [],
        },
      };
    }
    return {
      props: {
        status: 500,
        error: 'Something went wrong',
        transitions: [],
      },
    };
  }
};

export default Transactions;
