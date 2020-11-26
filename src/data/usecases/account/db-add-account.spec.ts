import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"
import { Hasher } from '@/data/protocols/cryptography/hasher'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: addAccountParams): Promise<accountModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      })
    }
  }
  return new AddAccountRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount
  addAccountRepositoryStub: AddAccountRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const hasherStub = makeHasher()
  const sut = new DbAddAccount(addAccountRepositoryStub, hasherStub)
  return {
    sut,
    addAccountRepositoryStub,
    hasherStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call DbAddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
  })

  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpty = jest.spyOn(hasherStub, 'encrypt')
    await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(encryptSpty).toHaveBeenCalledWith('any_password')
  })

  test('Should return a account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })
    expect(account).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
  })
})
