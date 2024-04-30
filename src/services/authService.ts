import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import dotenv from 'dotenv';

dotenv.config();

const authService = {
  register: async (username: string, email: string, password: string): Promise<User | null> => {
    try {
      const userRepository = getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({ username, email, password: hashedPassword });

      const savedUser = await userRepository.save(newUser);
      return savedUser;

    } catch (error) {
        if (error instanceof Error) {
          throw new Error('Error registering user: ' + error.message);
        } else {
        console.log("This is a non-Error object")
        }
      }
      return null;
  },

  login: async (email: string, password: string): Promise<string | null> => {
    try {
      // Fetch user from the database by email
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      // If user not found or password does not match, return null
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
      }

      // Generate JWT token for authentication
      if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
        throw new Error('JWT_SECRET or JWT_EXPIRES_IN is not set in the environment variables');
      }
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

      return token;
    } catch (error) {
        if (error instanceof Error) {
          throw new Error('Error logging in user: ' + error.message);
        } else {
            console.log("This is a non-Error object");
        }
    }
    return null;
    },
};

export default authService;
