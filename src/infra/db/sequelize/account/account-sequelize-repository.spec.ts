import { AccountSequelizeRepository } from './account-sequelize-repository'
import { Accounts } from '../models'
import connection from '../database'

describe('Account Sequelize Repositoy', () => {
  beforeAll(() => {
    Accounts.init(connection)
  })
  beforeEach(() => {
    Accounts.truncate()
  })
  afterAll(() => {
    connection.close()
  })

  describe('add', () => {
    test('Should create a new account in database', async () => {
      const sut = new AccountSequelizeRepository()
      const newAccount = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(newAccount).toBeTruthy()
      expect(newAccount.id).toBeTruthy()
      expect(newAccount.name).toBe('any_name')
      expect(newAccount.email).toBe('any_email@mail.com')
    })
  
    test('Should throws if add throws', async () => {
      const sut = new AccountSequelizeRepository()
      jest.spyOn(sut, 'add').mockReturnValueOnce(Promise.reject(new Error()))
      const promise = sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByEmail', () => {
    test('Should return an account on loadByEmail success', async () => {
      await Accounts.create({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      const sut = new AccountSequelizeRepository()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.email).toBe('any_email@mail.com')
    })

  })  
})
