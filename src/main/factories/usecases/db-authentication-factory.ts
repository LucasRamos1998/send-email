import { Authentication } from "@/domain/usecases/authentication";
import { DbAuthentication } from "@/data/usecases/account/authentication/db-authentication";
import { AccountSequelizeRepository } from "@/infra/db/account/account-sequelize-repository";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/jwt-adapter";

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const secret = process.env.JWT_SECRET || 'secret'
  const loadAccountByEmailRepository = new AccountSequelizeRepository()
  const hashCompare = new BcryptAdapter(salt)
  const encrypter = new JwtAdapter(secret)
  return new DbAuthentication(loadAccountByEmailRepository, hashCompare, encrypter)
}