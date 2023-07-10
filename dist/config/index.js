'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv'))
const path_1 = __importDefault(require('path'))
/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv_1.default.config({
  path: path_1.default.join(process.cwd(), '.env'),
})
exports.default = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  database_string: process.env.DATABASE_STRING,
  access_token: process.env.ACCESS_TOKEN,
  app_email: process.env.APP_EMAIL,
  app_password: process.env.APP_PASSWORD,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  paypal_client_id: process.env.PAYPAL_CLIENT_ID,
  paypal_secret_key: process.env.PAYPAL_SECRET_KEY,
  paypal_mode: process.env.PAYPAL_MODE,
}
