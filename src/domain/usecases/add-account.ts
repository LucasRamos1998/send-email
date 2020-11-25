import { accountModel } from '../models/account'

export type addAccountParams = Omit <accountModel, 'id'>

export interface AddAccount {
  add (account: addAccountParams): Promise<accountModel>
}