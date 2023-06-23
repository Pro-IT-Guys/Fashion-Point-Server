/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IBrand {
  name: string
}

export interface IBrandModel extends Model<IBrand> {
  // custom methods for your model would be defined here
  findByName(name: string): Promise<IBrand>
}
