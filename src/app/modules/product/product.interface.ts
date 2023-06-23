import { Model, Schema } from 'mongoose'

export interface IProduct {
  name: string
  path: string
  sku: string
  image: string[]
  buyingPrice: number
  sellingPrice: number
  description: string
  metaDescription: string
  quantity: number
  category: string
  color: string[] // color code hex
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

export interface IProductFilters {
  searchTerm?: string
}
