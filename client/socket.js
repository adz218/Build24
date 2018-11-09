import io from 'socket.io-client'
const socket = io(window.location.origin)
import store from './store'
import {setParticipants, setCards} from './store/singleGame'

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('newPlayer', backEndStore => {
    store.dispatch(setParticipants(backEndStore))
  })

  socket.on('setCardsForRoom', numsAndSuits => {
    console.log('client listener hit', numsAndSuits)
    store.dispatch(setCards(numsAndSuits))
  })
})

export default socket
