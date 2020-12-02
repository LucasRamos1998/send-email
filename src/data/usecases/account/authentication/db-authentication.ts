import { Authentication } from "@/domain/usecases/authentication";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository";
import { AuthenticationModel } from "@/domain/models/authentication";

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (email: string, password: string): Promise<AuthenticationModel> {
    await this.loadAccountByEmailRepository.loadByEmail(email)
    return null
  }
}