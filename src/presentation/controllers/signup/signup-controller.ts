import { Controller, Validation } from '@/presentation/protocols'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { ok, badRequest, serverError, forbidden } from '@/presentation/helpers/http/http-helpers'
import { ServerError, EmailInUseError } from '@/presentation/errors'
import { AddAccount } from '@/domain/usecases/add-account'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
    ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body
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