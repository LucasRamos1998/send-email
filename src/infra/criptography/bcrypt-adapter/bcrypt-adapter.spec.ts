import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hashed_value')
  },
  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12

describe('Bcrypt Adapter', () => {
  describe('hash', () => {
    test('Should call hash with correct value', async () => {
      const sut = new BcryptAdapter(salt)
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
  
    test('Should return a hashed value on hash success', async () => {
      const sut = new BcryptAdapter(salt)
      const hashValue = await sut.hash('any_value')
      expect(hashValue).toBe('hashed_value')
    })
  
    test('Should throws if hash throws', async () => {
      const sut = new BcryptAdapter(salt)
      jest.spyOn(sut, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
  
  describe('compare', () => {
    test('Should call compare with correct values', async () => {
      const sut = new BcryptAdapter(salt)
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'hashed_value')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashed_value')
    })

    test('Should return true if compare succeeds', async () => {
      const sut = new BcryptAdapter(salt)
      const response = await sut.compare('any_value', 'hashed_value')
      expect(response).toBe(true)
    })
  })

})
