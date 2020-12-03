import { ValidationComposite } from "@/validation/validators/validation-composite";
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation";
import { EmailValidation } from "@/validation/validators/email-validation";
import { EmailValidatorAdapter } from "@/infra/validators/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposite => {
  const validations = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  
  validations.push(new EmailValidation(new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}