import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { Authentication } from "@/domain/usecases/authentication";
import { ok, badRequest, unauthorized, serverError } from "@/presentation/helpers/http/http-helpers";
import { ServerError } from "@/presentation/errors";

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
    ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      
      const { email, password } = httpRequest.body
      const account = await this.authentication.auth(email, password)
      if (!account) return unauthorized()
      
      return ok(account)
    } catch (error) {
      console.log(error)
      return serverError(new ServerError(error))
    }
  }

}