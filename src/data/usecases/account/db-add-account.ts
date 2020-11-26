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
    const hashedPassword = await this.hasher.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return account
  }
}