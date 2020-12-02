import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from "@/presentation/errors"

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  
  
  const sut = new RequiredFieldValidation('required_field')
  return {
    sut
  }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamsError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('required_field'))
  })

  test('Should not return a MissingParamsError if succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ required_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
