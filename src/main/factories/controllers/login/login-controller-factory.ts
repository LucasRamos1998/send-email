import { Controller } from "@/presentation/protocols";
import { LoginController } from "@/presentation/controllers/login/login-controller";
import { makeDbAuthentication } from "../../usecases/db-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbAuthentication(), makeLoginValidation())
}