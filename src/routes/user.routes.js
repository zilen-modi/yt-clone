import { Router } from 'express';
import { login, profile, register } from '../controllers/user.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';

export const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware, profile);
