import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../controllers/user';
import User from './../../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import withAuth from '../../../middlewares/withAuth';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Please provide email and password' });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET as string
      );
      return res.status(200).json({
        message: 'User authenticated',
        token,
        user: { ...user._doc, password: '<secret>' },
      });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  } else {
    return res.status(405).json({ message: 'Route not found' });
  }
};

export default withAuth(handler);
