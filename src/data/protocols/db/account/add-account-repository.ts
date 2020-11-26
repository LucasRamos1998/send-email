import { addAccountParams } from "@/domain/usecases/add-account";
import { accountModel } from "@/domain/models/account";

export interface AddAccountRepository {
  add (accountData: addAccountParams): Promise<accountModel>
}