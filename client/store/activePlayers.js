import axios from 'axios'
import history from '../history'

//action type
const ADD_PLAYER = 'ADD_PLAYER'

const initialState = []

const addUser = user => ({type: ADD_PLAYER, user})

export const addUserThunk = user => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/players', user)
      dispatch(addUser(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.user]
    default:
      return state
  }
}
