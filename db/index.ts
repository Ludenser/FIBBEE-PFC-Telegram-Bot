
import { Sequelize } from 'sequelize';
import { UserFactory } from './models';
require('dotenv').config();
const DB_URL = process.env.DATABASE_URL

export const dbConfig = new Sequelize(
  DB_URL,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)


export const userModel = UserFactory(dbConfig);