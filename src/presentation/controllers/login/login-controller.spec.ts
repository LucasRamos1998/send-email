import { LoginController } from './login-controller'
import { Authentication } from "@/domain/usecases/authentication"
import { AuthenticationModel } from "@/domain/models/authentication"
import { ok } from '@/presentation/helpers/http/http-helpers'

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

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should calls Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest)
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
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
