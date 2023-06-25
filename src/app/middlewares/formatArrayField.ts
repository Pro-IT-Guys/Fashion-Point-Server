import { NextFunction, Request, Response } from 'express'

const formatArrayFields = (req: Request, res: Response, next: NextFunction) => {
  const fields = ['color', 'size', 'tag']
  fields.forEach(field => {
    if (req.body[field] && typeof req.body[field] === 'string') {
      req.body[field] = req.body[field].split(',').map((s: string) => s.trim())
    }
  })
  next()
}

export default formatArrayFields
