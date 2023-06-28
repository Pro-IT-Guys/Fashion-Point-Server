/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, successLogger } from './shared/logger'
import { Server } from 'http'

let server: Server

// Socket start ====================================================================>>>
/* eslint-disable @typescript-eslint/no-var-requires */
const io = require('socket.io')(8080, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const activeUsers: { userId: string; socketId: string }[] = []

io.on('connection', (socket: any) => {
  //   Add new user
  socket.on('new-user-add', (newUserId: string) => {
    if (newUserId && !activeUsers.some(user => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id })
    }
    console.log(activeUsers, 'active users')
    io.emit('get-active-users', activeUsers)
  })

  //  Send message
  socket.on('send-message', (data: any) => {
    const { receiverId } = data
    console.log(receiverId, 'data from socket')
    const receiver = activeUsers.find(user => {
      console.log(user.userId, receiverId._id, 'user from socket')
      return user.userId === receiverId._id
    })
    console.log(receiver, 'receiver from socket')

    if (receiver) {
      io.to(receiver.socketId).emit('receive-message', data)
    }
  })

  // Disconnect user
  socket.on('disconnect', () => {
    activeUsers.filter(user => user.socketId !== socket.id)
    io.emit('get-active-users', activeUsers)
  })
})

// Socket end ====================================================================>>>

/* This code is setting up a listener for uncaught exception. It's a synchronous process */
process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

/* This code is setting up a listener for unhandled promise rejections. It's a asynchronous process */
process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      errorLogger.error(error)
      process.exit(1)
    })
  }
})

/* `process.on('SIGTERM', () => {...})` sets up a listener for the SIGTERM signal, which is a signal
sent to a process to request its termination. When this signal is received, the code inside the
listener function is executed. In this case, if the `server` variable is defined (meaning the server
is running), it is closed and a success message is logged. This is a way to gracefully shut down the
server when the process is terminated, such as when the application is deployed to a cloud platform
and needs to be scaled down or updated. */
process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      successLogger.info('Process terminated')
    })
  }
})

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_string as string)
    if (config.env === 'development') {
      console.log('Database connected successfully')
    } else {
      successLogger.info('Database connected successfully')
    }

    server = app.listen(config.port, () => {
      if (config.env === 'development') {
        console.log(`Server is listening on port ${config.port}`)
      } else {
        successLogger.info(`Server is listening on port ${config.port}`)
      }
    })
  } catch (error) {
    errorLogger.error('Error while connecting database: ', error)
  }
}

databaseConnection()
