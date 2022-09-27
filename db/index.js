const { Sequelize } = require('sequelize')
require('dotenv').config();
const DB_URL = process.env.DATABASE_URL || 'postgres://zaxtucpcfpjjhq:779d60497c21bc93af1e9a1240d02ac2b0db9a473928289c5ed1465e1bf453f1@ec2-54-220-86-118.eu-west-1.compute.amazonaws.com:5432/ddm2155oflmhtp'

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