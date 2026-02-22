import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userResolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existing = await User.findOne({ $or: [{ username }, { email }] });
      if (existing) throw new Error('Username or email already in use');

      const user = new User({ username, email, password });
      await user.save();
      return user;
    }
  },

  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
      });
      if (!user) throw new Error('Invalid credentials');

      const valid = await user.checkPassword(password);
      if (!valid) throw new Error('Invalid credentials');

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return { token, user };
    }
  }
};

export default userResolvers;
