import { Schema, model } from 'mongoose'
import { IProduct, IProductModel } from './product.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: [String],
      required: true,
    },
    buyingPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'ProductBrand',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ProductType',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

productSchema.pre('findOneAndUpdate', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product = this as any

  const samePath = await productModel.findOne({
    path: product._update.path,
  })

  if (samePath) {
    throw new ApiError(httpStatus.CONFLICT, 'Product path already exists')
  }

  next()
})

const productModel = model<IProduct, IProductModel>('Product', productSchema)

export default productModel
