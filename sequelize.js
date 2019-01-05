const Sequelize = require('sequelize')
const UserModel = require('./models/user')

const sequelize = new Sequelize('se_test', 'se_candidate', 'shineon', {
  host: 'shine-se-test-dev.c3atgknvyfon.us-west-2.rds.amazonaws.com',
  dialect: 'mysql'
})


const User = UserModel(sequelize, Sequelize)

sequelize.sync()

module.exports = { User }