/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment } from 'paypal-rest-sdk'

export interface OrderWithRedirect {
  redirectUrl: string
}

export interface CustomPayment extends Payment {
  payer: {
    payment_method: string
    status: string
    payer_info?: {
      email: string
      first_name: string
      last_name: string
      payer_id: string
      shipping_address: any
      country_code: string
    }
  }
}
