import { EmailValidation } from './email-validation'
import { EmailValidator } from "../protocols/email-validator"
import { InvalidParamError } from '@/presentation/errors'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut =  new EmailValidation(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should call emailValidator with correct value', () => {
    const { sut, emailValidatorStub } =  makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return a error if EmailValidator return false', () => {
    const { sut, emailValidatorStub } =  makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.validate({ email: 'invalid_email' })
    expect(isValid).toEqual(new InvalidParamError('email'))
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } =  makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
