import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { AuthRoute } from '../modules/auth/auth.route'
import { BrandRoute } from '../modules/productBrand/brand.route'
import { TypeRoute } from '../modules/productType/type.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/brand',
    route: BrandRoute,
  },
  {
    path: '/type',
    route: TypeRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
