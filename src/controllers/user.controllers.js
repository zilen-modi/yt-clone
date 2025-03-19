import bcrypt from 'bcrypt';
import User from '../models/user.models.js';
import { generateJWTToken } from '../utils/generate-jwt-token.utils.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Some fields are missing' });
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).json({ message: "Email doesn't exists" });

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) return res.status(400).json({ message: "Password doesn't match" });

  const accessToken = generateJWTToken(user);

  return res.status(200).json({ message: 'User login successfully', accessToken });
};
