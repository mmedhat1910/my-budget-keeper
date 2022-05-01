import { getCookie, getCookies } from 'cookies-next';
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
  const token = getCookie('token');
  console.log(token);
  return {
    props: {},
  };
};

export default Transactions;
