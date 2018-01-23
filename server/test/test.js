/* eslint import/no-extraneous-dependencies: [0, {“devDependencies”: false}] */

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'


// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const db = require('../db')

chai.should()
chai.use(chaiHttp)

/* global before after */
// Our parent block
describe('Save and load tests', () => {
  before(() => { // Before each test we empty the database
    console.log('Clearing the database for you!')
    db.clear()
  })
  after(() => {
    console.log('Cleaning your messes up!')
    db.clear()
  })
  /*
  * Test the /GET route
  */
  describe('Get first CV', () => {
    const testText = 'Testing rest-api'
    it('it should answer with 200', () => {
      return chai.request(server)
        .get('/api/users/1')
        .then((res) => {
          res.should.have.status(200)
        })
    })

    it('it should save a sample CV', () => {
      return chai.request(server)
        .post('/api/users/test2')
        .send({ text: testText })
        .then((res) => {
          res.should.have.status(200) // Server currently always returns 200
          res.text.should.be.eql('Save succeeded.')
        })
    })

    it('it should load the recently saved CV', () => {
      return chai.request(server)
        .post('/api/users/test')
        .send({ text: testText })
        .then(() => {
          return chai.request(server)
            .get('/api/users/test')
            .then((res) => {
              res.should.have.status(200)
              res.text.should.be.eql(testText)
            })
        })
    })

    it('it should load an empty array of users', () => {
      return chai.request(server)
        .get('/api/users')
        .then((res) => {
          res.should.have.status(200)
          const usernameArray = res.body
          usernameArray.should.be.a('array')
          usernameArray.length.should.be.eql(0)
        })
    })

    it('it should load an empty array of cvs', () => {
      const nonExistingUsername = 'a'
      return chai.request(server)
        .get(`/api/users/${nonExistingUsername}/cvs`)
        .then((res) => {
          res.should.have.status(200)
          const cvArray = res.body
          cvArray.should.be.a('array')
          cvArray.length.should.be.eql(0)
        })
    })
  })
})
