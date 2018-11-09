import io from 'socket.io-client'
const socket = io(window.location.origin)
import store from './store'
import {setParticipants} from './store/singleGame'

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('newPlayer', backEndStore => {
    console.log('client listener hit', backEndStore)
    store.dispatch(setParticipants(backEndStore))
  })
})

export default socket
