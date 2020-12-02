import { ValidationComposite } from "@/validation/validators/validation-composite";
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation";
import { EmailValidation } from "@/validation/validators/email-validation";
import { EmailValidatorAdapter } from "@/infra/validators/email-validator-adapter";
import { CompareFieldsValidation } from "@/validation/validators/compare-fields-validation";

export const makeSignupValidation = (): ValidationComposite => {
  const validations = []
  for (const field of ['email', 'name', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation(new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}