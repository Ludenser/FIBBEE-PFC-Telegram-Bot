
const { Sequelize } = require('sequelize')
require('dotenv').config();
const DB_URL = process.env.DATABASE_URL

module.exports = new Sequelize(
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


