import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ICupon } from './cupon.interface'
import cuponModel from './cupon.model'
import { Types } from 'mongoose'

const createCupon = async (cuponData: ICupon): Promise<ICupon> => {
  const isExist = await cuponModel.findOne({ code: cuponData.code })
  if (isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Cupon already exist')

  const cupon = await cuponModel.create(cuponData)
  if (!cupon) throw new ApiError(httpStatus.BAD_REQUEST, 'Cupon not created')

  return cupon
}

const getCuponById = async (cuponId: string): Promise<ICupon> => {
  const cupon = await cuponModel.findById(cuponId)
  if (!cupon) throw new ApiError(httpStatus.NOT_FOUND, 'Cupon not found')

  return cupon
}

const getCuponByCode = async (cuponCode: string): Promise<ICupon> => {
  const cupon = await cuponModel.findOne({ code: cuponCode })
  if (!cupon) throw new ApiError(httpStatus.NOT_FOUND, 'Cupon not found')

  return cupon
}

const getAllCupons = async (): Promise<ICupon[]> => {
  const cupons = await cuponModel.find()
  if (!cupons) throw new ApiError(httpStatus.NOT_FOUND, 'Cupons not found')

  return cupons
}

const deleteCuponById = async (cuponId: string): Promise<ICupon> => {
  const cupon = await cuponModel.findByIdAndDelete(cuponId)
  if (!cupon) throw new ApiError(httpStatus.NOT_FOUND, 'Cupon not found')

  return cupon
}

const verifyCupon = async (
  cuponCode: string,
  userId: string
): Promise<ICupon> => {
  const cupon = await cuponModel.findOne({ code: cuponCode })
  if (!cupon) throw new ApiError(httpStatus.NOT_FOUND, 'Cupon not found')

  const isExpired = new Date() > cupon.expireDate
  if (isExpired) throw new ApiError(httpStatus.BAD_REQUEST, 'Cupon expired')

  const userIdObj = new Types.ObjectId(userId)
  const isUsed = cupon.usedBy.includes(userIdObj)

  if (isUsed) throw new ApiError(httpStatus.BAD_REQUEST, 'Cupon already used')

  return cupon
}

export const CuponService = {
  createCupon,
  getCuponById,
  getCuponByCode,
  getAllCupons,
  deleteCuponById,
  verifyCupon,
}
