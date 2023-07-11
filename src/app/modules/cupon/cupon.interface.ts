/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface ICupon {
  code: string
  discount: number
  usedBy: Types.ObjectId[]
  expireDate: Date
}

export interface ICuponModel extends Model<ICupon> {
  getCuponById(userId: string): Promise<ICupon>
}
