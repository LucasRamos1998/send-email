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
