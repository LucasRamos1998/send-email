import { Model, DataType, } from 'sequelize-typescript'

export class Accounts extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataType.STRING,
        primaryKey: true
      },
      name: DataType.STRING,
      email: DataType.STRING,
      password: DataType.STRING
    }, {
      sequelize
    })
  }
}