import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddAccount } from '@/domain/usecases/add-account'

export class SignupController implements Controller {
  constructor (  private readonly addAccout: AddAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body
    await this.addAccout.add({
      name,
      email,
      password
    })
    return null
  }
}