const Sequelize = require('sequelize')
const UserModel = require('./models/user')

const sequelize = new Sequelize('se_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})


const User = UserModel(sequelize, Sequelize)

sequelize.sync()

module.exports = { User }