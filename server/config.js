const development = {
  databaseURL: 'postgres:///cv_db',
  clientURL: 'http://localhost:5000',
  env: 'local',
}
const production = {
  databaseURL: process.env.DATABASE_URL,
  clientURL: process.env.CLIENT_URL,
  env: 'production',
}

const test = {
  databaseURL: 'postgres:///cv_db_test',
  env: 'test',
}

console.log(`Running, config is: ${process.env.NODE_ENV}`)

switch (process.env.NODE_ENV) {
  case 'development':
    module.exports = development
    break

  case 'production':
    module.exports = production
    break

  case 'test':
    module.exports = test
    break

  default:
    module.exports = development
    break
}
