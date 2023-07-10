'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ProductValidation = void 0
const zod_1 = require('zod')
const createProductZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z
      .string({
        required_error: 'Name is required',
      })
      .min(2)
      .max(255),
    path: zod_1.z
      .string({
        required_error: 'Path is required',
      })
      .trim()
      .toLowerCase(),
    frontImage: zod_1.z.string().optional(),
    backImage: zod_1.z.string().optional(),
    restImage: zod_1.z.array(zod_1.z.string()).optional(),
    buyingPrice: zod_1.z.number({
      required_error: 'Buying price is required',
    }),
    sellingPrice: zod_1.z.number({
      required_error: 'Selling price is required',
    }),
    description: zod_1.z.string({
      required_error: 'Description is required',
    }),
    metaDescription: zod_1.z.string({
      required_error: 'Meta description is required',
    }),
    quantity: zod_1.z
      .number({
        required_error: 'Quantity is required',
      })
      .min(0),
    category: zod_1.z.string({
      required_error: 'Category is required',
    }),
    color: zod_1.z.array(
      zod_1.z.string({
        required_error: 'Color is required',
      })
    ),
    size: zod_1.z.array(
      zod_1.z.string({
        required_error: 'Size is required',
      })
    ),
    tag: zod_1.z.array(
      zod_1.z.string({
        required_error: 'Tag is required',
      })
    ),
    brand: zod_1.z.string({
      required_error: 'Brand is required',
    }),
    rating: zod_1.z.number({
      required_error: 'Rating is required',
    }),
    type: zod_1.z.string({
      required_error: 'Type is required',
    }),
  }),
})
exports.ProductValidation = {
  createProductZodSchema,
}
