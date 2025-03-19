import { Router } from 'express';
import { login, register } from '../controllers/user.controllers.js';

export const router = Router();

router.get('/register', register);
router.get('/login', login);
