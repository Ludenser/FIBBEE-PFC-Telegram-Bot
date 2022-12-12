
import { Sequelize } from 'sequelize';
import { UserFactory } from './models';
require('dotenv').config();
const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
} = process.env

export const dbConfig = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    port:5432,
      host: POSTGRES_HOST,
      dialect: 'postgres'
  });

export const userModel = UserFactory(dbConfig);