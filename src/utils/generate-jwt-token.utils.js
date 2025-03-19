/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';

export const generateJWTToken = (user) => {
  const { id, name, email } = user;
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};
