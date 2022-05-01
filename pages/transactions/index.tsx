import { getCookies } from 'cookies-next';
import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../../components/Layout';

const Transactions = () => {
  return (
    <Layout>
      <div>Transactions</div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx);
  return {
    props: {},
  };
};

export default Transactions;
