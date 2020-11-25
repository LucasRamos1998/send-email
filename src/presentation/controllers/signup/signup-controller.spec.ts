import { SignupController } from "./signup-controller"
import { AddAccount, addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"

const makeAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount{
    add (account: addAccountParams): Promise<accountModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
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
  test('Should call addAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const addSpy = jest.spyOn(addAccountStub, 'add')
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })
  })
})
