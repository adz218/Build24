import io from 'socket.io-client'
const socket = io(window.location.origin)
import store from './store'
import {setGame, setWinner, clearState} from './store/game'
import {getPlayers} from './store/players'
import {addMessage} from './store/messages'

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('setGame', numsAndSuits => {
    store.dispatch(setGame(numsAndSuits))
  })

  socket.on('clearState', () => {
    store.dispatch(clearState())
  })
  socket.on('newPlayer', () => {
    store.dispatch(getPlayers())
  })

  socket.on('send-message', msgAndUser => {
    store.dispatch(addMessage(msgAndUser))
  })

  socket.on('winner', winnerAndSoln => {
    store.dispatch(setWinner(winnerAndSoln))
  })
})

export default socket
