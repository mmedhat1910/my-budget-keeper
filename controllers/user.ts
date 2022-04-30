import User from './../models/User';
export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }
  return null;
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const user = await User.create({
      email,
      password,
      name,
    });
    return user;
  } catch (err) {
    throw err;
  }
};
