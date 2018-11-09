const Sequelize = require('sequelize')
const db = require('../db')

const PlayerGame = db.define('PlayerGame', {
  winner: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
})

module.exports = PlayerGame
