const Sequelize = require('sequelize')
const UserModel = require('./models/user')

const sequelize = new Sequelize('se_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


const User = UserModel(sequelize, Sequelize)

sequelize.sync()

module.exports = { User }