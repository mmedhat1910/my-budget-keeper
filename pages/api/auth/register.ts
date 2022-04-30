import User from './../../../models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './../../../lib/mongodb';
import bcrypt from 'bcrypt';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  if (req.method === 'POST') {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email: email,
      password: password,
      name: name,
    });
    const newUser = await user.save();
    if (!newUser) {
      return res.status(400).json({ message: 'User not created' });
    }
    return res.status(201).json({ message: 'User created' });
  } else {
    res.status(409).json({ message: 'No Route Found' });
  }
};

export default handler;
