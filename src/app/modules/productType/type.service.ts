import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import typeModel from './type.model'
import { IType } from './type.interface'

const createType = async (typeData: IType): Promise<IType> => {
  const { name } = typeData
  const isExist = await typeModel.findOne({ name })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Product type already exists')
  }

  const type = await typeModel.create(typeData)
  if (!type) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product type not created')
  }

  return type
}

export const TypeService = {
  createType,
}
