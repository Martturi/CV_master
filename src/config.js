const development = {
  databaseURL: 'postgres:///cv_db',
  env: 'local',
}
const production = {
  databaseURL: process.env.DATABASE_URL,
  env: 'production',
}

const isProduction = process.env.ENVIRONMENT === 'production'
console.log(`Running, config is production: ${isProduction}`)
module.exports = isProduction ? production : development
