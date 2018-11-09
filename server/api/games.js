const router = require('express').Router()
const Game = require('../db/models/AllGames')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create(req.body)
    res.json(newGame)
  } catch (err) {
    next(err)
  }
})
