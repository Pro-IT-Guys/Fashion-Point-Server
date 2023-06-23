import { Schema, model } from 'mongoose'
import { IType, ITypeModel } from './type.interface'

const typeSchema = new Schema<IType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const typeModel = model<IType, ITypeModel>('Brand', typeSchema)

export default typeModel
