import { bodyParser } from '../middlewares'
import { Express } from 'express'

export default (app: Express) => {
  app.use(bodyParser)
}