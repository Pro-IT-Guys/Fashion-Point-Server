import { Server, Socket } from 'socket.io'
import ChatController from './chat.controller'
import userModel from '../user/user.model'

const setupSocket = (io: Server, chatController: ChatController): void => {
  io.on('connection', async (socket: Socket) => {
    // Check if the socket belongs to the admin
    const isAdmin = await checkIfSocketIsAdmin(socket)

    if (isAdmin) {
      chatController.setAdminSocket(socket)
    }
  })

  chatController.initialize()
}

const checkIfSocketIsAdmin = async (socket: Socket): Promise<boolean> => {
  // Implement your logic to determine if the socket belongs to the admin
  // You can compare the socket ID with the admin's socket ID stored in the database

  const adminId = 'admin-id' // Replace with the actual admin ID

  // Retrieve the admin user document from the database
  const adminUser = await userModel.findById(adminId)
  console.log(adminUser)
  console.log(socket.id)
  // Compare the socket ID with the admin's socket ID
  return adminUser?.socketId === socket.id
}

export default setupSocket
