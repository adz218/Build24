const Sequelize = require('sequelize')
const db = require('../db')

const InGamePlayer = db.define('player', {
  username: {
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

module.exports = InGamePlayer
