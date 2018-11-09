const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('games', {
  players: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  winner: {
    type: Sequelize.STRING
  },
  numbers: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  suits: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Game
