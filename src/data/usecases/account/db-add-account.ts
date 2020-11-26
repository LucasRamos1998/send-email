import { AddAccount, addAccountParams } from "@/domain/usecases/add-account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { accountModel } from "@/domain/models/account";
import { Hasher } from "@/data/protocols/cryptography/hasher";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository";

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: addAccountParams): Promise<accountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return account
  }
}