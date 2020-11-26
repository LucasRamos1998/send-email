import { SignupController } from "./signup-controller"
import { AddAccount, addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"
import { ok, badRequest, serverError, forbidden } from "@/presentation/helpers/http/http-helpers"
import { MissingParamError, InvalidParamError, ServerError, EmailInUseError } from "@/presentation/errors"

const mockRequest = {
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password'
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
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })
  })

  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if password is different to passwordConfirmation', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'other_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('password')))
  })

  test('Should return 400 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(mockResponse))
  })
})