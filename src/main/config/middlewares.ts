import { bodyParser, cors } from '../middlewares'
import { Express } from 'express'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
}