import axios from 'axios'
import history from '../history'

//action type
const ADD_MESSAGE = 'ADD_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'

const initialState = []

// export const addPlayer = email => {
//   return async dispatch => {
//     try {
//       const addedPlayer = await axios.post('/api/players', email)
//       dispatch(addingPlayer(addedPlayer.data))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

export const getMessages = () => ({
  type: GET_MESSAGES
})

export const addMessage = messageAndUser => ({
  type: ADD_MESSAGE,
  messageAndUser
})

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.messageAndUser]
    case GET_MESSAGES:
      return state
    default:
      return state
  }
}
