const router = require('express').Router()
const {User} = require('../db/models')
const Player = require('../db/models/player')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll()
    res.json(players)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPlayer = await Player.create({email: req.body.email})
    res.json(newPlayer)
  } catch (err) {
    next(err)
  }
})
