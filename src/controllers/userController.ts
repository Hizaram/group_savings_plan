import { Request, Response } from 'express';
import userService from '../services/userService';

const userController = {
  sendInvites: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, planId, friendIds } = req.body;

      await userService.sendInvites(userId, planId, friendIds);
      res.status(200).json({ message: 'Invitations sent successfully' });
    } catch (error) {
      console.error('Error sending invites:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default userController;