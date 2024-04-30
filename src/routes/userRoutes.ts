import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/invite/:planId', userController.sendInvites);

export default router;