import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/add-account'
import { ok, badRequest } from '@/presentation/helpers/http/http-helpers'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class SignupController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requireFields = ['email', 'name', 'password', 'passwordConfirmation']

    for (let field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { name, email, password } = httpRequest.body

    const account = await this.addAccount.add({
      name,
      email,
      password
    })
    return ok(account)
  }
}