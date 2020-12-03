import app from '../config/app'
import { Accounts } from '@/infra/db/sequelize/models'
import connection from '@/infra/db/sequelize/database'
import request from 'supertest'
import { hash } from 'bcrypt'

describe('Signup Route', () => {
  beforeAll(() => {
    Accounts.init(connection)
  })

  beforeEach(async () => {
    await Accounts.truncate()
  })
  
  afterAll(async () => {
    await Accounts.truncate()
    connection.close()
  })

  describe('POST /login', () => {
    test('Should return 200 on signup', async () => {
      const password = await hash('any_password', 12)
      await Accounts.create({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      await request(app)
      .post('/api/login')
      .send({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      .expect(200)
    })
  })
  
})
