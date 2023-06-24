/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ProductService } from './product.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import pick from '../../../shared/pick'
import { PRODUCT_FILTER_FIELDS } from './product.constant'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body
  const uploadedFiles = req.files as any

  if (Object.keys(uploadedFiles).length !== 0) {
    const frontImage = uploadedFiles.frontImage.map(
      (file: any) => file.filename
    )
    const backImage = uploadedFiles.backImage.map((file: any) => file.filename)
    const restImage = uploadedFiles.restImage.map((file: any) => file.filename)

    productData.frontImage = frontImage[0]
    productData.backImage = backImage[0]
    productData.restImage = restImage
  }

  const product = await ProductService.createProduct(productData)
  const responseData = {
    message: 'Product created successfully',
    data: product,
  }

  sendSuccessResponse(res, responseData)
}

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id
  const productData = req.body

  const product = await ProductService.updateProduct(productId, productData)
  const responseData = {
    message: 'Product updated successfully',
    data: product,
  }

  sendSuccessResponse(res, responseData)
})

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...PRODUCT_FILTER_FIELDS])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await ProductService.getAllProduct(filters, paginationOption)

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All users fetched successfully',
  }

  sendSuccessResponse(res, responseData)
})

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id

  const product = await ProductService.getProductById(productId)
  const responseData = {
    message: 'Product fetched successfully',
    data: product,
  }

  sendSuccessResponse(res, responseData)
})

const getProductByPath = catchAsync(async (req: Request, res: Response) => {
  const productPath = req.params.path

  const product = await ProductService.getProductByPath(productPath)
  const responseData = {
    message: 'Product fetched successfully',
    data: product,
  }

  sendSuccessResponse(res, responseData)
})

export const ProductController = {
  createProduct,
  updateProduct,
  getAllProduct,
  getProductById,
  getProductByPath,
}
