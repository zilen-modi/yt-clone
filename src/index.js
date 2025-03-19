/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import connectDatabase, { sequelize } from './db/config.js';
import { router as userRoutes } from './routes/user.routes.js';
import { router as taskRoutes } from './routes/task.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

await sequelize.sync({ alter: true });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDatabase();
});
