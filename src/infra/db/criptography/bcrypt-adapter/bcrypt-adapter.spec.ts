import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string>{
    return Promise.resolve('hashed_value')
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hashed value on hash success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashValue = await sut.hash('any_value')
    expect(hashValue).toBe('hashed_value')
  })
})
