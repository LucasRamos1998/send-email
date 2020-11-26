import { accountModel } from "@/domain/models/account";

export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise <accountModel>
}