/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.header('Authorization').split('Bearer ')[1];

  if (!accessToken) return res.status(400).json({ message: 'Unauthorised request' });

  const verified = jwt.verify(accessToken, process.env.JWT_SECRET);

  req.user = await User.findByPk(verified.id, {
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt'],
    },
  });

  if (!req.user) return res.status(400).json({ message: 'Access token expired' });

  next();
};
