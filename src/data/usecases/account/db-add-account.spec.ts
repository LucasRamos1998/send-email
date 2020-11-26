import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: addAccountParams): Promise<accountModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
    }
  }
  return new AddAccountRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(addAccountRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call DbAddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
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
