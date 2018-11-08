import axios from 'axios'
import history from '../history'

const CREATE_GAME = 'CREATE_GAME'
const GET_GAMES = 'GET_GAMES'

const initialState = []

const createGame = game => ({type: CREATE_GAME, game})
const getGames = games => ({type: GET_GAMES, games})

export const createGameThunk = host => {
  return async dispatch => {
    try {
      const newGame = await axios.post('/api/games', host)
      console.log('thunk response', newGame.data)
      dispatch(createGame(newGame.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getGamesThunk = () => {
  return async dispatch => {
    try {
      const allGames = await axios.get('/api/games')
      dispatch(getGames(allGames.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return action.games
    case CREATE_GAME:
      return [...state, action.game]
    //will just add to our arr of objects, each obj being a game instance with participants
    //will update each game instance upon join
    default:
      return state
  }
}
