import { AddAccount, addAccountParams } from "@/domain/usecases/add-account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { accountModel } from "@/domain/models/account";
import { Hasher } from "@/data/protocols/cryptography/hasher";

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher
  ) {}

  async add (accountData: addAccountParams): Promise<accountModel> {
    await this.hasher.encrypt(accountData.password)
    await this.addAccountRepository.add(accountData)
    return null
  }
}