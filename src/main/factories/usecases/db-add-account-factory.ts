import { AddAccount } from '@/domain/usecases/add-account'
import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AccountSequelizeRepository } from '@/infra/db/account/account-sequelize-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter =  new BcryptAdapter(salt)
  const accountSeuquelizeRepository = new AccountSequelizeRepository()
  return new DbAddAccount(accountSeuquelizeRepository, bcryptAdapter ,accountSeuquelizeRepository)
}