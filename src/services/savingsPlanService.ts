import { getRepository } from 'typeorm';
import { SavingsPlan } from '../entities/SavingsPlan';
import { User } from '../entities/User';

const savingsPlanService = {
  createPlan: async (userId: number, name: string, description: string, targetAmount: string): Promise<SavingsPlan> => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('User not found');
      }

      const savingsPlanRepository = getRepository(SavingsPlan);
      const newPlan = savingsPlanRepository.create({ user, name, description, targetAmount });
      const savedPlan = await savingsPlanRepository.save(newPlan);

      return savedPlan;
    } catch (error) {
        if (error instanceof Error) {
          throw new Error('Error creating savings plan: ' + error.message);
        } else {
          throw new Error('Error creating savings plan');
        }
      }
  },

  joinPlan: async (userId: number, planId: number): Promise<void> => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('User not found');
      }

      const savingsPlanRepository = getRepository(SavingsPlan);
      const plan = await savingsPlanRepository.findOne({
        where: { id: planId },
        relations: ['user']
      });

      if (!plan) {
        throw new Error('Savings plan not found');
      }
      
      if (user) {
        plan.user = user;
      } else {
        throw new Error('User not found');
      }
      const isMember = plan.user.id === user.id;
      if (isMember) {
        throw new Error('User is already part of the savings plan');
      }

      plan.user = user;
      await savingsPlanRepository.save(plan);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error('Error joining savings plan: ' + error.message);
        } else {
          throw new Error('Error joining savings plan');
        }
      }
    },

  declineInvite: async (userId: number, planId: number): Promise<void> => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('User not found');
      }

      const savingsPlanRepository = getRepository(SavingsPlan);
      const plan = await savingsPlanRepository.findOne({ where: { id: planId } });

      if (!plan) {
        throw new Error('Savings plan not found');
      }

      plan.user = null;
      await savingsPlanRepository.save(plan);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error('Error declining savings plan invite: ' + error.message);
        } else {
          throw new Error('Error declining savings plan invite');
        }
      }
  },
};

export default savingsPlanService;
