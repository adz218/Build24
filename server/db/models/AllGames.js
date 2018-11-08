const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('games', {
  // name: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  players: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  host: {
    type: Sequelize.STRING,
    allowNull: false
  },
  winners: {
    type: Sequelize.STRING,
    defaultValue: 'N/A',
    validate: {
      isIn: [['N/A', 'goodguys', 'badguys']]
    }
  },
  stage: {
    type: Sequelize.STRING,
    defaultValue: 'waiting',
    validate: {
      isIn: [['waiting', 'active', 'finished']]
    }
  }
})

module.exports = Game
