module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('newPlayer', newPlayer => {
      if (backEndStore.length < 5) backEndStore.push(newPlayer)
      console.log('backendstore after a push', backEndStore)
      io.emit('newPlayer', backEndStore)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // socket.on('designate', )
  })
}

const backEndStore = []
