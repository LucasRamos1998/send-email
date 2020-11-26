import { AddAccount, addAccountParams } from "@/domain/usecases/add-account";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { accountModel } from "@/domain/models/account";

export class DbAddAccount implements AddAccount {
  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async add (account: addAccountParams): Promise<accountModel> {
    await this.addAccountRepository.add(account)
    return null
  }
}