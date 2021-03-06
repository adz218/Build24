module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('newPlayer', () => {
      io.emit('newPlayer')
    })

    socket.on('setGame', (nums, suits) => {
      io.emit('setGame', [[...nums], [...suits]])
    })

    socket.on('winner', (winner, solution) => {
      const arg = [winner, solution]
      io.emit('winner', arg)
    })

    socket.on('clearState', () => {
      io.emit('clearState')
    })

    socket.on('send-message', messageAndUser => {
      io.emit('send-message', messageAndUser)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // socket.on('designate', )
  })
}
