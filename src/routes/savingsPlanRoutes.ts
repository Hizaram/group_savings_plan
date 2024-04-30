import express from 'express';
import savingsPlanController from '../controllers/savingsPlanController';

const router = express.Router();

router.post('/create', savingsPlanController.createPlan);
router.post('/:planId/join', savingsPlanController.joinPlan);
router.post('/:planId/decline', savingsPlanController.declineInvite);

export default router;