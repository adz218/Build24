import axios from 'axios'
import history from '../history'

//action type
const ADD_PLAYER = 'ADD_PLAYER'
const GET_PLAYERS = 'GET_PLAYERS'

const initialState = []

const addingPlayer = player => ({type: ADD_PLAYER, player})
const gettingPlayers = players => ({type: GET_PLAYERS, players})

export const addPlayer = email => {
  return async dispatch => {
    try {
      const addedPlayer = await axios.post('/api/players', email)
      dispatch(addingPlayer(addedPlayer.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getPlayers = () => {
  return async dispatch => {
    try {
      const activePlayers = await axios.get('/api/players')
      dispatch(gettingPlayers(activePlayers.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.player]
    case GET_PLAYERS:
      return action.players
    default:
      return state
  }
}
