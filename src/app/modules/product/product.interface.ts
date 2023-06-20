import { Model, Schema } from 'mongoose'

export interface IProduct {
  name: string
  path: string
  image: string[]
  buyingPrice: number
  sellingPrice: number
  description: string
  metaDescription: string
  quantity: number
  category: string
  color: string[]
  size: string[]
  tag: string[]
  brand: Schema.Types.ObjectId // productBrand id ref
  rating: number
  type: Schema.Types.ObjectId // productType id ref
}

export interface IProductModel extends Model<IProduct> {
  // eslint-disable-next-line no-unused-vars
  getProductById(id: string): Promise<IProduct>
}
