const Sequelize = require('sequelize')
const UserModel = require('./models/user')

const sequelize = new Sequelize('se_test', 'se_candidate', 'shineon', {
  host: 'shine-se-test-dev.c3atgknvyfon.us-west-2.rds.amazonaws.com',
  dialect: 'mysql'
})


const User = UserModel(sequelize, Sequelize)

// Disabled now that we are no longer user a local db for development
// sequelize.sync()

module.exports = { User }