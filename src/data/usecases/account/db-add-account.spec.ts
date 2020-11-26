import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"

describe('DbAddAccount UseCase', () => {
  test('Should call DbAddAccountRepository with correct values', async () => {
    class DbAddAccountRepositoryStub implements AddAccountRepository {
      async add (accountData: addAccountParams): Promise<accountModel> {
        return Promise.resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password'
        })
      }
    }
    const dbAddAccountRepositoryStub = new DbAddAccountRepositoryStub()
    const sut = new DbAddAccount(dbAddAccountRepositoryStub)
    const addSpy = jest.spyOn(dbAddAccountRepositoryStub, 'add')
    await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
  })
})
