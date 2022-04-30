import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../lib/mongodb';
import jwt from 'jsonwebtoken';
import initMiddleware from './initMiddleware';
import Cors from 'cors';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const withAuth = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    if (
      !req.url?.includes('/api/auth/login') &&
      !req.url?.includes('/api/auth/register')
    ) {
      const { token } = req.headers;

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      try {
        const decoded = jwt.verify(
          token as string,
          process.env.JWT_SECRET as string
        );
        if (!decoded) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.body = { ...req.body, decoded };
        return handler(req, res);
      } catch (err) {
        return res.status(500).json({ message: (err as Error).message });
      }
    }
    return handler(req, res);
  };
};

export default withAuth;
