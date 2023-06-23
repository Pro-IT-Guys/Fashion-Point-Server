import { SortOrder } from 'mongoose'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import paginationHelper from '../../helpers/paginationHelper'
import { USER_SEARCH_FIELDS } from './user.constant'
import { IUser, IUserFilters } from './user.interface'
import userModel from './user.model'

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

export const UserService = {
  getAllUsers,
}
