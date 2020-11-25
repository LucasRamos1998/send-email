import { accountModel } from '../models/account'

export type addAccountParams = Omit <accountModel, 'id'>

export interface addAccount {
  add (account: addAccountParams): Promise<accountModel>
}