import express from 'express';
import dotenv from 'dotenv';
import connectDatabase, { sequelize } from './db/config.js';
import { router as userRoutes } from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

await sequelize.sync({ alter: true });

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server running on port ${PORT}`);
  connectDatabase();
});
