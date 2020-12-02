import { AuthenticationModel } from '../models/authentication'

export interface Authentication {
  auth (email: string, password: string): Promise<AuthenticationModel>
}