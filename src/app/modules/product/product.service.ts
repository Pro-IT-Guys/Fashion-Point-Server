import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IProduct } from './product.interface'
import productModel from './product.model'

const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const isExist = await productModel.findOne({ path: productData.path })
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exist')
  }

  const product = (await productModel.create(productData)).populate([
    {
      path: 'brand',
    },
    {
      path: 'type',
    },
  ])

  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product creation failed')

  return product
}

export const ProductService = {
  createProduct,
}
