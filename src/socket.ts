// /* eslint-disable @typescript-eslint/no-var-requires */
// const io = require('socket.io')(8080, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// })

// const activeUsers: { userId: string; socketId: string }[] = []

// io.on('connection', (socket: any) => {
//   //   Add new user
//   socket.on('new-user-add', (newUserId: string) => {
//     if (!activeUsers.some(user => user.userId === newUserId)) {
//       activeUsers.push({ userId: newUserId, socketId: socket.id })
//     }

//     io.emit('get-active-users', activeUsers)
//   })

//   // Disconnect user
//   socket.on('disconnect', () => {
//     activeUsers.filter(user => user.socketId !== socket.id)
//     console.log(activeUsers, 'user disconnected')
//     io.emit('get-active-users', activeUsers)
//   })
// })
