import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from "@/presentation/errors"

type SutTypes = {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')
  return {
    sut
  }
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamsError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return a InvalidParamsError if succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
