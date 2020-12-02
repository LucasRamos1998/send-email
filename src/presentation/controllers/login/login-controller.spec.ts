import { LoginController } from './login-controller'
import { Authentication } from "@/domain/usecases/authentication"
import { AuthenticationModel } from "@/domain/models/authentication"

describe('Login Controller', () => {
  test('Should calls Authentication with correct values', () => {
    class AuthenticationStub implements Authentication {
      async auth (email: string, password: string): Promise<AuthenticationModel> {
        return Promise.resolve({
          id: 'any_id',
          name: 'any_name',
          token: 'any_token'
        })
      }
    }
    const authenticationStub = new AuthenticationStub()
    const sut = new LoginController(authenticationStub)
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    sut.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })
})
