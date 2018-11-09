import axios from 'axios'
import history from '../history'

const initState = {
  status: '',
  players: [],
  numbers: [],
  suits: []
}

const SET_PARTICIPANTS = 'SET_PARTICIPANTS'
const ADD_PLAYER = 'ADD_PLAYER'
const SET_CARD = 'SET_CARD'
const CREATE_CARDS = 'CREATE_CARDS'

export const addPlayerToGame = player => ({type: ADD_PLAYER, player})
export const setParticipants = participants => ({
  type: SET_PARTICIPANTS,
  participants
})

//setting after client listener hits
export const setCards = numsAndSuits => ({
  type: SET_CARD,
  numsAndSuits
})

export default function(state = initState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return {...state, players: [...state.players, action.player]}
    case SET_PARTICIPANTS:
      return {...state, players: action.participants}
    case SET_CARD:
      return {
        ...state,
        numbers: action.numsAndSuits[0],
        suits: action.numsAndSuits[1]
      }
    default:
      return state
  }
}
