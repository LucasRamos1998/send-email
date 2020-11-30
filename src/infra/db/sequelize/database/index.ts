import { Sequelize } from 'sequelize'
import dbConfig from '../config/database'
import { Accounts } from '../models'

const connection = new Sequelize(dbConfig)

Accounts.init(connection)

export default connection