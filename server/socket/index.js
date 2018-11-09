module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('newPlayer', () => {
      io.emit('newPlayer')
    })

    socket.on('setGame', (nums, suits) => {
      console.log('nums and suits', nums, suits)
      io.emit('setGame', [[...nums], [...suits]])
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // socket.on('designate', )
  })
}
