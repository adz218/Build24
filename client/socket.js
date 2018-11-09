import io from 'socket.io-client'
const socket = io(window.location.origin)
import store from './store'
import {setGame} from './store/game'
import {getPlayers} from './store/players'

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('setGame', numsAndSuits => {
    console.log('client listener hit', numsAndSuits)
    store.dispatch(setGame(numsAndSuits))
  })

  socket.on('newPlayer', () => {
    console.log('client listener hit for new player')
    store.dispatch(getPlayers())
  })
})

export default socket
