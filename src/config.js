const development = {
  databaseURL: 'postgres:///cv_db',
}
const production = {
  databaseURL: process.env.DATABASE_URL,
}

const isProduction = process.env.ENVIRONMENT === 'production'
console.log(`Running, config is production: ${isProduction}`)
module.exports = isProduction ? production : development
