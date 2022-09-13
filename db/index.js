const { Sequelize } = require('sequelize')
require('dotenv').config();
const DB_URL = process.env.DATABASE_URL || 'postgres://vqktkafkooesla:ebba53cb1550efbef5e2d5ceed9fc78421d88db7da4864b2789b7539ecb5c8c0@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/daopoms87fdmb5'

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