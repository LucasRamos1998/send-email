import { LoginController } from './login-controller'
import { Authentication } from "@/domain/usecases/authentication"
import { AuthenticationModel } from "@/domain/models/authentication"
import { ok, badRequest, unauthorized, serverError } from '@/presentation/helpers/http/http-helpers'
import { Validation } from '@/presentation/protocols'
import { MissingParamError, UnauthorizedError } from '@/presentation/errors'

const mockRequest = {
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<AuthenticationModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        token: 'any_token'
      })
    }
  }
  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login Controller', () => {
  test('Should calls Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest)
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should return 401 if Authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpReponse = await sut.handle(mockRequest)
    expect(httpReponse).toEqual(unauthorized())
  })

  test('Should throw if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))
    const httpReponse = await sut.handle(mockRequest)
    expect(httpReponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpReponse = await sut.handle(mockRequest)
    expect(httpReponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return an AuthenticationModel if Authentication succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok({
      name: 'any_name',
      id: 'any_id',
      token: 'any_token'
    }))
  })
})
