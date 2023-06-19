import { IUser } from '../user/user.interface'

// For sending response-------------
export interface IUserResponse {
  accessToken: string
  data: Partial<IUser>
}
