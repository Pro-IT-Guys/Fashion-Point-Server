import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBrand } from './brand.interface'
import brandModel from './brand.model'

const createBrand = async (brandData: IBrand): Promise<IBrand> => {
  const { name } = brandData
  const isExist = await brandModel.findOne({ name })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Brand already exists')
  }

  const brand = await brandModel.create(brandData)
  if (!brand) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand not created')
  }

  return brand
}

export const BrandService = {
  createBrand,
}
