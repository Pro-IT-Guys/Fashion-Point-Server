import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { UserService } from './user.service'
import { USER_FILTER_FIELDS } from './user.constant'
import pick from '../../../shared/pick'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'
import { IUser } from './user.interface'

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...USER_FILTER_FIELDS])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await UserService.getAllUsers(filters, paginationOption)

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All users fetched successfully',
  }

  sendSuccessResponse<IUser[]>(res, responseData)
})

export const UserController = {
  getAllUsers,
}
