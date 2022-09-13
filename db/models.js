const sequelize = require('../db/index');
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  tg_username: { type: DataTypes.STRING, unique: true },
  clickup_user_id: { type: DataTypes.INTEGER, unique: true },
  clickup_username: { type: DataTypes.STRING, unique: true },
  clickup_token: { type: DataTypes.STRING }
})

module.exports = User