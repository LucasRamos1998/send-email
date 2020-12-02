import { Authentication } from "@/domain/usecases/authentication";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository";
import { AuthenticationModel } from "@/domain/models/authentication";
import { HashCompare } from "@/data/protocols/cryptography/hash-compare";

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare
    ) {}

  async auth (email: string, password: string): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) return null

    const isValid = await this.hashCompare.compare(password, account.password)

    if (!isValid) return null
  }
}