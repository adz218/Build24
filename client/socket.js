import io from 'socket.io-client'
import {gameRoom, clientBroadcast} from './store/singleGame'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
