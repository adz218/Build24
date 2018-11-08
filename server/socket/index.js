module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('newPlayer', gameState => {
      console.log(`${socket.id} updating:`, gameState)
      socket.broadcast.emit('newPlayer', socket.id, gameState)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // socket.on('designate', )
  })
}
