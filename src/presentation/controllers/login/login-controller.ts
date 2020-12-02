import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { Authentication } from "@/domain/usecases/authentication";
import { ok } from "@/presentation/helpers/http/http-helpers";

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body
    const authenticationModel = await this.authentication.auth(email, password)
    return ok(authenticationModel)
  }
}