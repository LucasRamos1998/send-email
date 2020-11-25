import { SignupController } from "./signup-controller"
import { addAccount, addAccountParams } from "@/domain/usecases/add-account"
import { accountModel } from "@/domain/models/account"

describe('Signup Controller', () => {
  test('Should call addAccount with correct values', () => {
    class AddAccountStub implements addAccount{
      add (account: addAccountParams): Promise<accountModel> {
        return Promise.resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password'
        })
      }
    }
    const addAccountStub = new AddAccountStub()
    const sut = new SignupController(addAccountStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const addSpy = jest.spyOn(addAccountStub, 'add')
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })
  })
})
