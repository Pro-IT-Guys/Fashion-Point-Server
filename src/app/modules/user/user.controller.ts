import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { UserService } from './user.service'

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers()
  const responseData = {
    data: users,
    message: 'Users retrieved successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const UserController = {
  getAllUsers,
}
