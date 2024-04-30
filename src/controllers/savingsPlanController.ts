import { Request, Response } from 'express';
import savingsPlanService from '../services/savingsPlanService';

const savingsPlanController = {
  createPlan: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, name, description, target_amount } = req.body;

      const plan = await savingsPlanService.createPlan(userId, name, description, target_amount);
      res.status(201).json(plan);
    } catch (error) {
      console.error('Error creating savings plan:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  joinPlan: async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body.userId;
      const { planId } = req.params;

      await savingsPlanService.joinPlan(userId, parseInt(planId, 10));
      res.status(200).json({ message: 'Successfully joined savings plan' });
    } catch (error) {
      console.error('Error joining savings plan:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  declineInvite: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.userId;
      const { planId } = req.params;

      await savingsPlanService.declineInvite(userId, parseInt(planId, 10));
      res.status(200).json({ message: 'Successfully declined savings plan invitation' });
    } catch (error) {
      console.error('Error declining savings plan invitation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default savingsPlanController;