import { Validation } from "@/presentation/protocols";
import { MissingParamError } from "@/presentation/errors";

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly requiredFieldName: string
  ) {}

  validate (input: any): Error {
    if (!input[this.requiredFieldName]) return new MissingParamError(this.requiredFieldName)
  }

}