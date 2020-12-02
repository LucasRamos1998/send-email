import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { Authentication } from "@/domain/usecases/authentication";

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body
    this.authentication.auth(email, password)
    return null
  }
}