import { SignupController } from "./signup-controller"
import { AddAccount, addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"
import { ok } from "@/presentation/helpers/http/http-helpers"

const mockRequest = {
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
}

const mockResponse = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
}

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount{
    add (account: addAccountParams): Promise<accountModel> {
      return Promise.resolve(mockResponse)
    }
  }
  return new AddAccountStub()
}

type SutTypes = {
  sut: SignupController
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccountStub()
    const sut = new SignupController(addAccountStub)
    return {
      sut,
      addAccountStub
    }
}

describe('Signup Controller', () => {
  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(mockResponse))
  })
})
