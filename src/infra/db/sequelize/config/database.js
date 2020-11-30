require('dotenv/config')
const nodeEnvironment = process.env.NODE_ENV

const environment = {
  test: {
    dialect: 'mysql',
    host: 'localhost', 
    username: 'root',
    password: '12345678',
    database: 'Send_Email_Test',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  local: {
    dialect: 'mysql',
    host: 'localhost', 
    username: 'root',
    password: '12345678',
    database: 'Send_Email',
    define: {
      timestamps: true,
      underscored: true
    }
  }
}

module.exports = environment[nodeEnvironment] || environment.local
