const router = require('express').Router()
const {User} = require('../db/models')
const Player = require('../db/models/player')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = Player.findAll()
    res.json(players)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPlayer = await Player.create({username: req.body.username})
    res.json(newPlayer)
  } catch (err) {
    next(err)
  }
})
