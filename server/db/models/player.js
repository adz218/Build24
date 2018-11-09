const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
  // role: {
  //   type: Sequelize.STRING,
  //   validate: {
  //     isIn: [['plainGood', 'merlin', 'plainBaddie', 'assasssin']]
  //   }
  // }
})

module.exports = Player
