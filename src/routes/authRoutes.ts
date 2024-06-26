import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();

// AUTHENTICATION
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

export default router;