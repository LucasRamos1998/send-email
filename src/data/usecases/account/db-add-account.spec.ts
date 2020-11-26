import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository"
import { addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"
import { Hasher } from '@/data/protocols/cryptography/hasher'

const mockRequest = {
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
}

const mockResponse = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
}

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
      return Promise.resolve(mockResponse)
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
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockRequest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpty = jest.spyOn(hasherStub, 'encrypt')
    await sut.add(mockRequest)
    expect(encryptSpty).toHaveBeenCalledWith('any_password')
  })

  test('Should return a account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockRequest)
    expect(account).toEqual(mockResponse)
  })
})
