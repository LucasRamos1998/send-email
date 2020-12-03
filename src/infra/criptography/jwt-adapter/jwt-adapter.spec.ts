import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_value')
  }
}))

const secret = 'any_secret'

describe('JWT Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter(secret)
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret')
  })
  
})
