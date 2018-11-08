const router = require('express').Router()
const Game = require('../db/models/AllGames')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const players = await Game.findAll()
    res.json(players)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPlayer = await Game.create({
      players: [req.body.email],
      host: req.body.email
    })
    res.json(newPlayer)
  } catch (err) {
    next(err)
  }
})
