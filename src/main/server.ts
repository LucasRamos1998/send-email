import sequelize from '../infra/db/sequelize/database'

const port  = 3333

sequelize.authenticate().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(port, () => console.log(`Listening on port ${port}`))
}).catch((err) =>  console.log(err))


