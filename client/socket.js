import io from 'socket.io-client'
const socket = io(window.location.origin)
import store from './store'
import {addPlayer} from './store/activePlayers'

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('newPlayer', (socketId, gameState) => {
    console.log('client listener hit')
    store.dispatch(addPlayer(socketId, gameState))
  })
})

export default socket
