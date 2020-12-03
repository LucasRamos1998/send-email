import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeLoginController } from "../factories/controllers/login/login-controller-factory";

export default (router: Router) => {
  router.post('/login', adaptRoute(makeLoginController()) )
}