import { SignupController } from "./signup-controller"
import { ok, badRequest, serverError, forbidden } from "@/presentation/helpers/http/http-helpers"
import { MissingParamError, ServerError, EmailInUseError } from "@/presentation/errors"
import { Validation } from "@/presentation/protocols"
import { AddAccount, addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"


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

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: SignupController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccountStub()
    const validationStub = makeValidationStub()
    const sut = new SignupController(addAccountStub, validationStub)
    return {
      sut,
      addAccountStub,
      validationStub
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

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest)
    expect(validateSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse =  await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
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
