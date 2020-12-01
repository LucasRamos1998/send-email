import { Controller } from '@/presentation/protocols/controller'
import { SignupController } from '@/presentation/controllers/signup/signup-controller'
import { makeDbAddAccount } from '../usecases/db-add-account-factory'

export const makeSignupController = (): Controller => {
  return new SignupController(makeDbAddAccount())
}