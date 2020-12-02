import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository"
import { accountModel } from "@/domain/models/account"

const mockResponse = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
}

describe('Db Authentication', () => {
  test('Should call LoadAccountByEmailRepository with correct value', () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      loadByEmail (email: string): Promise <accountModel> {
        return Promise.resolve(mockResponse)
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    sut.auth('any_email@mail.com', 'any_password')
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  
})
