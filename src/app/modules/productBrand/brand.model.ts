import { Schema, model } from 'mongoose'
import { IBrand, IBrandModel } from './brand.interface'

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const brandModel = model<IBrand, IBrandModel>('ProductBrand', brandSchema)

export default brandModel
