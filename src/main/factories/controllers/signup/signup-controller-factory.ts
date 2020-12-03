import { makeSignupValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '../../usecases/db-add-account-factory'
import { Controller } from '@/presentation/protocols/controller'
import { SignupController } from '@/presentation/controllers/signup/signup-controller'

export const makeSignupController = (): Controller => {
  return new SignupController(makeDbAddAccount(), makeSignupValidation())
}