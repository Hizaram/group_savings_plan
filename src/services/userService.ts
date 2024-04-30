import { getRepository, In } from 'typeorm';
import { User } from '../entities/User';

const userService = {
    sendInvites: async (userId: number, planId: number, friendIds: number[]): Promise<void> => {
        try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['savingsPlans']
          });


        if (!user) {
            throw new Error('User not found');
        }
        
        const plan = user.savingsPlans.find(plan => plan.id === planId);
        if (!plan) {
            throw new Error('User is not the owner of the savings plan');
        }

        // Check if the number of friendIds exceeds 5
        if (friendIds.length > 5) {
            throw new Error('You can only invite up to 5 friends');
        }

        // Fetch the friends from the database
        const invitedFriends = await userRepository.findBy({ id: In(friendIds) });

      // Send invites to each friend
      for (const friend of invitedFriends) {
        console.log(`Inviting ${friend.username} to join the savings plan`);
      }

      console.log('Invitations sent successfully');
        } catch (error) {
            if (error instanceof Error) {
            throw new Error('Error sending invites ' + error.message);
            } else {
            throw new Error('Error sending invites');
            }
        }
    },
};

export default userService;
