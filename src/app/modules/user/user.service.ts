import { SortOrder } from 'mongoose'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import paginationHelper from '../../helpers/paginationHelper'
import { USER_SEARCH_FIELDS } from './user.constant'
import { IUser, IUserFilters } from './user.interface'
import userModel from './user.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const getAllUsers = async (
  filters: IUserFilters,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IUser[]>> => {
  const { searchTerm, ...filterFields } = filters

  // Need update here, search by name is not working as name is a embeded field--------->

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: USER_SEARCH_FIELDS.map(field => ({
        [field]: new RegExp(searchTerm, 'i'),
      })),
    })
  }

  if (Object.keys(filterFields).length) {
    andConditions.push({
      $and: Object.entries(filterFields).map(([key, value]) => ({
        [key]: value,
      })),
    })
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await userModel
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
    .select({
      password: 0,
      verificationCode: 0,
      codeGenerationTimestamp: 0,
      __v: 0,
    })
  const total = await userModel.countDocuments()

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  return responseData
}

const updateUser = async (
  userId: string,
  userData: Partial<IUser>
): Promise<IUser> => {
  const isExist = await userModel.findOne({ _id: userId })
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    userData,
    { new: true }
  )

  if (!updatedUser)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'USomething went wrong to update user'
    )
  return updatedUser
}

export const UserService = {
  getAllUsers,
  updateUser,
}
