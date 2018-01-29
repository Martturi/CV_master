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
        .get('/api/users/1/cvs/1')
        .then((res) => {
          res.should.have.status(200)
        })
    })

    it('it should load an empty array of users', () => {
      return chai.request(server)
        .get('/api/users')
        .then((res) => {
          res.should.have.status(200)
          const usernameArray = res.body
          console.log(usernameArray)
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

    it('it should save a sample CV', () => {
      return chai.request(server)
        .post('/api/users/test2/cvs/test1')
        .send({ text: testText })
        .then((res) => {
          res.should.have.status(200) // Server currently always returns 200
          res.text.should.be.eql('Save succeeded.')
        })
    })

    it('it should load the recently saved CV', () => {
      return chai.request(server)
        .post('/api/users/test/cvs/1')
        .send({ text: testText })
        .then(() => {
          return chai.request(server)
            .get('/api/users/test/cvs/1')
            .then((res) => {
              res.should.have.status(200)
              res.text.should.be.eql(testText)
            })
        })
    })


    const nonExistingCVString = 'New CV'
    it(`it should return '${nonExistingCVString}' for a non-existing combination of user and CV name`, () => {
      const nonExistingUsername = 'a'
      const nonExistingCVName = 'b'
      return chai.request(server)
        .get(`/api/users/${nonExistingUsername}/cvs/${nonExistingCVName}`)
        .then((res) => {
          res.should.have.status(200)
          const cvContents = res.text
          cvContents.should.be.eql(nonExistingCVString)
        })
    })

    const copyUser1 = 'user4831178'
    const cvToBeCopied = 'cv857842' // name of the cv
    it('it should return correct CV names after copying', () => {
      const copyUser2 = 'user2139782'
      return chai.request(server)
        .post(`/api/users/${copyUser1}/cvs/${cvToBeCopied}/copy`)
        .then((firstResult) => {
          firstResult.should.have.status(200)
          const firstCVName = firstResult.text
          firstCVName.should.be.eql(`${cvToBeCopied}(1)`)
          return chai.request(server)
            .post(`/api/users/${copyUser2}/cvs/${cvToBeCopied}/copy`)
            .then((secondResult) => {
              secondResult.should.have.status(200)
              const secondCVName = secondResult.text
              secondCVName.should.be.eql(`${cvToBeCopied}(1)`)
              return chai.request(server)
                .post(`/api/users/${copyUser1}/cvs/${cvToBeCopied}/copy`)
                .then((thirdResult) => {
                  thirdResult.should.have.status(200)
                  const thirdCVName = thirdResult.text
                  thirdCVName.should.be.eql(`${cvToBeCopied}(2)`)
                })
            })
        })
    })

    const deleteAcceptedText = 'Delete accepted'
    const existingCVs = [`${cvToBeCopied}(1)`, `${cvToBeCopied}(2)`]
    it(`it should return '${deleteAcceptedText}' for a user with two CVs`, () => {
      return chai.request(server)
        .delete(`/api/users/${copyUser1}/cvs/${existingCVs[0]}`)
        .then((result) => {
          result.should.have.status(200)
          const returnedText = result.text
          returnedText.should.be.eql(deleteAcceptedText)
        })
    })

    const deleteDeniedText = 'Delete denied'
    it(`it should return '${deleteDeniedText}' for a user with one CV`, () => {
      return chai.request(server)
        .delete(`/api/users/${copyUser1}/cvs/${existingCVs[1]}`)
        .then((result) => {
          result.should.have.status(200)
          const returnedText = result.text
          returnedText.should.be.eql(deleteDeniedText)
        })
    })
  })
})
