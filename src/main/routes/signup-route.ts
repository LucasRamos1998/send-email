import { Router} from "express"
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory'

export default (router: Router) => {
  router.post('/signup', adaptRoute(makeSignupController()))
}