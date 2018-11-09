const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('games', {
  numbers: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  suits: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Game
