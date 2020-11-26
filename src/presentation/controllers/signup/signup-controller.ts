import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/add-account'
import { ok, badRequest, serverError, forbidden } from '@/presentation/helpers/http/http-helpers'
import { MissingParamError, InvalidParamError, ServerError, EmailInUseError } from '@/presentation/errors'

export class SignupController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requireFields = ['email', 'name', 'password', 'passwordConfirmation']

      for (let field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('password'))

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) return forbidden(new EmailInUseError())
      return ok(account)
    } catch(error) {
      console.log(error)
      return serverError(new ServerError(error))
    }
  }
}