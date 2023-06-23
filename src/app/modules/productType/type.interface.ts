/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IType {
  name: string
}

export interface ITypeModel extends Model<IType> {
  // custom methods for your model would be defined here
  findByName(name: string): Promise<IType>
}
