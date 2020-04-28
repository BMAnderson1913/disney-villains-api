const Sequelize = require('sequelize')
const VillainsModel = require('./villains')

const connection = new Sequelize('disney', 'ursula', 'underTHEse@!', {
  host: 'localhost', dialect: 'mysql',
})

const Villains = VillainsModel(connection, Sequelize)

module.exports = { Villains }
