import { z } from 'zod'

const createProductZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2)
      .max(255),
    path: z
      .string({
        required_error: 'Path is required',
      })
      .trim()
      .toLowerCase(),
    image: z.array(
      z.string({
        required_error: 'Image is required',
      })
    ),
    buyingPrice: z.number({
      required_error: 'Buying price is required',
    }),
    sellingPrice: z.number({
      required_error: 'Selling price is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    metaDescription: z.string({
      required_error: 'Meta description is required',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .min(0),
    category: z.string({
      required_error: 'Category is required',
    }),
    color: z.array(
      z.string({
        required_error: 'Color is required',
      })
    ),
    size: z.array(
      z.string({
        required_error: 'Size is required',
      })
    ),
    tag: z.array(
      z.string({
        required_error: 'Tag is required',
      })
    ),
    brand: z.string({
      required_error: 'Brand is required',
    }),
    rating: z.number({
      required_error: 'Rating is required',
    }),
    type: z.string({
      required_error: 'Type is required',
    }),
  }),
})

export const ProductValidation = {
  createProductZodSchema,
}
