import bcrypt from 'bcrypt';
import User from './../models/User';
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    return user;
  } catch (err) {
    throw err;
  }
};
