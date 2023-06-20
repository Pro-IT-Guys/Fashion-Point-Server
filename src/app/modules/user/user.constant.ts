/* eslint-disable no-unused-vars */
export enum USER_ROLE_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}

export const USER_ROLE_ARRAY: string[] = Object.values(USER_ROLE_ENUM)

export const USER_SEARCH_FIELDS = ['name', 'email', 'phone', 'address']
export const USER_FILTER_FIELDS = ['role', 'isVerified']
