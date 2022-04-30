import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../lib/mongodb';

const withAuth = (handler: NextApiHandler): NextApiHandler => {
  dbConnect();
  return async (req: NextApiRequest, res: NextApiResponse) => {};
  return handler;
};
