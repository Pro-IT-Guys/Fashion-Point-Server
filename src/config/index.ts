import dotenv from 'dotenv'
import path from 'path'
/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
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
