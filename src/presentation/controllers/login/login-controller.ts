import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { Authentication } from "@/domain/usecases/authentication";
import { ok, badRequest } from "@/presentation/helpers/http/http-helpers";

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
    ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) return badRequest(error)
    
    const { email, password } = httpRequest.body
    const authenticationModel = await this.authentication.auth(email, password)
    return ok(authenticationModel)
  }
}