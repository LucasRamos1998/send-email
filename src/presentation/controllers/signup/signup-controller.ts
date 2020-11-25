import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { addAccount } from '@/domain/usecases/add-account'

export class SignupController implements Controller {
  constructor (  private readonly addAccout: addAccount) {}

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