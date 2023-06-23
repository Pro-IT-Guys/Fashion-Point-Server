import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IProduct } from './product.interface'
import productModel from './product.model'
import generateUniqueSKU from '../../helpers/generateUniqueSKU'

const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const isExist = await productModel.findOne({ path: productData.path })
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exist')
  }

  let sku = generateUniqueSKU(6)
  while (await productModel.findOne({ sku })) {
    sku = generateUniqueSKU(6) // Check if the generated SKU already exists in the database. If it does, generate a new one.
  }

  const product = (
    await productModel.create({
      ...productData,
      sku,
    })
  ).populate([
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

const updateProduct = async (
  productId: string,
  productData: Partial<IProduct>
): Promise<IProduct> => {
  const isExist = await productModel.findOne({ _id: productId })
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found')

  const product = await productModel
    .findOneAndUpdate({ _id: productId }, productData, {
      new: true,
    })
    .populate([
      {
        path: 'brand',
      },
      {
        path: 'type',
      },
    ])

  if (!product)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product update failed')

  return product
}

export const ProductService = {
  createProduct,
  updateProduct,
}
