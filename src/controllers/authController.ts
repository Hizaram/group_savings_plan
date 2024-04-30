import { User } from '../entities/User';
import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';


class AuthController {
    // define signup function
    static async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body;

            const registeredUser = await authService.register(username, email, password);
            
            res.status(201).json(registeredUser);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async login(req: Request, res: Response): Promise<void> {
        try {
          // Extract email and password from request body
          const { email, password } = req.body;
    
          // Call authService to authenticate user
          const user = await authService.login(email, password);
    
          // Check if user exists and password is correct
          if (!user) {
            // Unauthorized: Invalid credentials
            res.status(401).json({ message: 'Invalid credentials' });
            return;
          }
    
          // Respond with the authenticated user
          res.status(200).json(user);
        } catch (error) {
          console.error('Error logging in user:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
    }
};
    
export default AuthController;