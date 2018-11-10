import axios from 'axios'
import history from '../history'

const CREATE_GAME = 'CREATE_GAME'
const GET_GAME = 'GET_GAME'
const SET_GAME = 'SET_GAME'

const initialState = {numbers: [], suits: [], gameId: ''}

const getGames = games => ({type: GET_GAME, games})
const createGameCreator = game => ({type: CREATE_GAME, game})
export const setGame = arr => ({type: SET_GAME, arr})

export const getCurrent = () => {
  return async dispatch => {
    try {
      const allGames = await axios.get('/api/games')
      console.log('get current game from allGames', allGames.data)
      dispatch(getGames(allGames.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createGame = (numbers, suits) => {
  return async dispatch => {
    try {
      const newGame = await axios.post('/api/games', {numbers, suits})
      dispatch(createGameCreator(newGame.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addSolution = solution => {
  return async dispatch => {
    try {
      const solvedGame = await axios.put('api/games')
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {
        numbers: action.games[action.games.length - 1].numbers,
        suits: action.games[action.games.length - 1].suits,
        gameId: action.games[action.games.length - 1].id
      }
    case CREATE_GAME:
      return {...state, numbers: action.game.numbers, suits: action.game.suits}
    case SET_GAME:
      return {
        ...state,
        numbers: action.arr[0],
        suits: action.arr[1]
      }
    default:
      return state
  }
}
