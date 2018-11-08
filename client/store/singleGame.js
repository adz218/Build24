import axios from 'axios'
import history from '../history'

const initState = {
  status: '',
  players: [],
  roles: ['good', 'bad'],
  quest: [2, 3, 3, 4, 4],
  votes: [],
  nominator: '',
  nominees: []
}

const NOMINATE_PLAYER = 'NOMINATE_PLAYER'
const DESELECT_PLAYER = 'DESELECT_PLAYER'
const SUBMIT_VOTE = 'SUBMIT_VOTE'

export const nominatePlayer = player => ({type: NOMINATE_PLAYER, player})
export const unselect = player => ({type: DESELECT_PLAYER, player})
export const voteOnNominees = vote => ({type: SUBMIT_VOTE, vote})

export default function(state = initState, action) {
  switch (action.type) {
    case NOMINATE_PLAYER:
      return {...state, nominees: [...state.nominees, action.player]}
    case DESELECT_PLAYER:
      return {
        ...state,
        nominees: state.nominees.filter(el => {
          return el.id !== action.player.id
        })
      }
    case SUBMIT_VOTE:
      return {...state, votes: [...state.votes, action.vote]}
    default:
      return state
  }
}
