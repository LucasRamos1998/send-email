import app from '../config/app'
import { Accounts } from '@/infra/db/sequelize/models'
import connection from '@/infra/db/sequelize/database'
import request from 'supertest'

describe('Signup Route', () => {
  beforeAll(() => {
    Accounts.init(connection)
  })

  beforeEach(async () => {
    await Accounts.truncate()
  })
  
  afterAll(() => {
    connection.close()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
      .post('/api/signup')
      .send({
        name: "any_name",
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
    })
  })
  
})
