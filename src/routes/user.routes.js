import { Router } from 'express';
import { register } from '../controllers/user.controllers.js';

export const router = Router();

router.get('/register', register);
