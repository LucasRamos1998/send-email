import { Accounts } from '../models'
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"
import uuid4 from "uuid4"

export class AccountSequelizeRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: addAccountParams): Promise<accountModel> {
    const id = uuid4()
    const newAccount = await Accounts.create({
      ...accountData,
      id
    })
    return newAccount
  }

  async loadByEmail (email: string): Promise <accountModel> {
    const account = await Accounts.findOne({
      where: { email }
    })
    return account ? account : null
  }
}