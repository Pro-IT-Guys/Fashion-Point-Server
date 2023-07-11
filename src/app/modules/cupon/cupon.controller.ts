import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CuponService } from './cupon.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createCupon = catchAsync(async (req: Request, res: Response) => {
  const cuponData = req.body
  const cupon = await CuponService.createCupon(cuponData)
  const responseData = {
    data: cupon,
    message: 'Cupon created successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getCuponById = catchAsync(async (req: Request, res: Response) => {
  const { cuponId } = req.params
  const cupon = await CuponService.getCuponById(cuponId)
  const responseData = {
    data: cupon,
    message: 'Cupon fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getCuponByCode = catchAsync(async (req: Request, res: Response) => {
  const { cuponCode } = req.params
  const cupon = await CuponService.getCuponByCode(cuponCode)
  const responseData = {
    data: cupon,
    message: 'Cupon fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getAllCupons = catchAsync(async (req: Request, res: Response) => {
  const cupons = await CuponService.getAllCupons()
  const responseData = {
    data: cupons,
    message: 'Cupons fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const deleteCuponById = catchAsync(async (req: Request, res: Response) => {
  const { cuponId } = req.params
  const cupon = await CuponService.deleteCuponById(cuponId)
  const responseData = {
    data: cupon,
    message: 'Cupon deleted successfully',
  }
  sendSuccessResponse(res, responseData)
})

const verifyCupon = catchAsync(async (req: Request, res: Response) => {
  const { cuponCode, userId } = req.params
  const cupon = await CuponService.verifyCupon(cuponCode, userId)
  const responseData = {
    data: cupon,
    message: 'Cupon is valid and can be used',
  }
  sendSuccessResponse(res, responseData)
})

export const CuponController = {
  createCupon,
  getCuponById,
  getCuponByCode,
  getAllCupons,
  deleteCuponById,
  verifyCupon,
}
