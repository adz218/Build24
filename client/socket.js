import io from 'socket.io-client'
const socket = io(window.location.origin)
import store from './store'
import {setGame} from './store/game'

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('newPlayer', backEndStore => {
    store.dispatch(setParticipants(backEndStore))
  })

  socket.on('setGame', numsAndSuits => {
    console.log('client listener hit', numsAndSuits)
    store.dispatch(setGame(numsAndSuits))
  })
})

export default socket
