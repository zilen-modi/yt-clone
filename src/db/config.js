import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('youtube_clone', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const connectDatabase = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('DB Connected!');
    })
    .catch((err) => {
      console.log('Error connecting to DB:', err);
    });
};

export default connectDatabase;
