import { Schema, model } from 'mongoose'
import { IReturn, IReturnModel } from './return.interface'

const returnPolicySchema = new Schema<IReturn>({
  content: {
    type: String,
    required: true,
  },
})

const returnPolicyModel = model<IReturn, IReturnModel>(`ReturnPolicy`, returnPolicySchema)
export default returnPolicyModel
