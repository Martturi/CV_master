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
    console.log('Clearing the test database!')
    db.clear()
  })
  after(() => {
    console.log('Cleaning your messes up!')
    db.clear()
  })

  // Test the returning of current user
  describe('Get current user with no auth', () => {
    it('it should answer with 200', () => {
      return chai.request(server)
        .get('/api/loggedInUser')
        .then((res) => {
          res.should.have.status(200)
          res.text.should.equal('defaultUser')
        })
    })
  })

  /*
  * Test the /GET route
  */
  describe('Get first CV', () => {
    const initSuccessMessage = 'Initialize succeeded.'
    const testCVID = 1
    const testUserObject = { username: 'a', full_name: 'Default Tester' }
    const testUsername = testUserObject.username
    const testCVName = 'b'
    const testSections = [ // ids hardcoded on purpose
      {
        section_id: 1,
        fin_title: 'ftitle1',
        eng_title: 'etitle1',
        fin_template: 'ftemplate1',
        eng_template: 'etemplate1',
        order: 50,
      },
      {
        section_id: 2,
        fin_title: 'ftitle2',
        eng_title: 'etitle2',
        fin_template: 'ftemplate2',
        eng_template: 'etemplate2',
        order: 100,
      },
      {
        section_id: 3,
        fin_title: 'ftitle3',
        eng_title: 'etitle3',
        fin_template: 'ftemplate3',
        eng_template: 'etemplate3',
        order: 0,
      },
      {
        section_id: 4,
        fin_title: 'ftitle4',
        eng_title: 'etitle4',
        fin_template: 'ftemplate4',
        eng_template: 'etemplate4',
        order: 150,
      },
    ]

    it('it should load an array containing one specific cv after initializing test db', () => {
      return db.initializeTestDB(testUsername, testCVName, testSections)
        .then((resText) => {
          resText.should.be.eql(initSuccessMessage)
          return chai.request(server)
            .get(`/api/users/${testUsername}/cvs`)
            .then((res) => {
              res.should.have.status(200)
              const cvArray = res.body
              cvArray.should.be.a('array')
              cvArray.length.should.be.eql(1)
              cvArray[0].cv_name.should.be.eql(testCVName)
            })
        })
    })

    it('it should answer with 200', () => {
      return chai.request(server)
        .get(`/api/cvs/${testCVID}`)
        .then((res) => {
          res.should.have.status(200)
        })
    })

    it('it should load an array containing one specific user after initializing test db', () => {
      return db.initializeTestDB(testUsername, testCVName, testSections)
        .then(() => {
          return chai.request(server)
            .get('/api/users')
            .then((res) => {
              res.should.have.status(200)
              const usernameArray = res.body
              usernameArray.should.be.a('array')
              usernameArray.length.should.be.eql(1)
              usernameArray[0].username.should.be.eql(testUsername)
            })
        })
    })

    it('it should save a sample CV', () => {
      return chai.request(server)
        .post(`/api/cvs/${testCVID}`)
        .send({ sections: [] })
        .then((res) => {
          res.should.have.status(200)
          res.text.should.be.eql('Save succeeded.')
        })
    })

    it('it should load the recently saved CV', () => {
      const savedSections = [
        {
          section_id: testSections[0].section_id,
          fin_text: 'feuahfgquei234',
          eng_text: 'hfsghuiefg547',
        },
      ]
      return chai.request(server)
        .post(`/api/cvs/${testCVID}`)
        .send({ sections: savedSections })
        .then(() => {
          return chai.request(server)
            .get(`/api/cvs/${testCVID}`)
            .then((res) => {
              res.should.have.status(200)
              const sections = res.body
              sections.should.be.a('array')
              sections.length.should.be.eql(testSections.length)
              for (let i = 0; i < sections.length; i += 1) {
                // finding the index of sections[i] in savedSections:
                const savedSectionsIndex = savedSections
                  .findIndex(a => a.section_id === sections[i].section_id)
                if (savedSectionsIndex !== -1) {
                  // if we found the index in savedSections,
                  // compare sections[i].lang_text to savedSections[savedSectionsIndex].lang_text:
                  sections[i].fin_text.should.be.eql(savedSections[savedSectionsIndex].fin_text)
                  sections[i].eng_text.should.be.eql(savedSections[savedSectionsIndex].eng_text)
                } else {
                  // else find index of sections[i] in testSections:
                  const testSectionsIndex = testSections
                    .findIndex(a => a.section_id === sections[i].section_id)
                  // compare texts to templates:
                  sections[i].fin_text.should.be.eql(testSections[testSectionsIndex].fin_template)
                  sections[i].eng_text.should.be.eql(testSections[testSectionsIndex].eng_template)
                }
              }
            })
        })
    })

    it('it should return an array of template sections for a non-existing CV', () => {
      const nonExistingCVID = 428319
      return chai.request(server)
        .get(`/api/cvs/${nonExistingCVID}`)
        .then((res) => {
          res.should.have.status(200)
          const sections = res.body
          sections.should.be.a('array')
          sections.length.should.be.eql(testSections.length)
          for (let i = 0; i < testSections.length; i += 1) {
            // find index of sections[i] in testSections:
            const testSectionsIndex = testSections
              .findIndex(a => a.section_id === sections[i].section_id)
            // compare texts to templates:
            sections[i].fin_text.should.be.eql(testSections[testSectionsIndex].fin_template)
            sections[i].eng_text.should.be.eql(testSections[testSectionsIndex].eng_template)
          }
        })
    })

    const existingCVs = []
    it('it should return a reasonable CV id after copying', () => {
      existingCVs.push(testCVID)
      return chai.request(server)
        .post(`/api/cvs/${testCVID}/copy`)
        .then((result) => {
          result.should.have.status(200)
          const cvID = Number(result.text)
          if (result.status === 200) existingCVs.push(cvID)
          cvID.should.be.gt(testCVID)
        })
    })

    it('it should delete one row when a user has at least two CVs, otherwise it should delete none', () => {
      const deleteCV = () => {
        return chai.request(server)
          .delete(`/api/cvs/${existingCVs[existingCVs.length - 1]}`)
          .then((result) => {
            result.should.have.status(200)
            if (existingCVs.length >= 2) {
              if (result.text === '1') existingCVs.pop()
              result.text.should.be.eql('1')
              deleteCV()
            } else {
              result.text.should.be.eql('0')
            }
          })
      }
      deleteCV()
    })

    const newName = 'New name'
    it('it should update one row when renaming an existing CV', () => {
      return chai.request(server)
        .put(`/api/cvs/${existingCVs[0]}`)
        .send({ newCVName: newName })
        .then((result) => {
          result.should.have.status(200)
          result.text.should.be.eql('1')
        })
    })

    it('it should update zero rows when renaming a non-existing CV name', () => {
      const nonExistingCVID = 9248285
      return chai.request(server)
        .put(`/api/cvs/${nonExistingCVID}`)
        .send({ newCVName: newName })
        .then((result) => {
          result.should.have.status(200)
          result.text.should.be.eql('0')
        })
    })

    it('it should return HTML page with contents for preview route', () => {
      return chai.request(server)
        .post('/actions/preview')
        .send({ sections: [{ section_id: 1, fin_text: 'test' }], userObject: testUserObject })
        .then((result) => {
          result.should.have.status(200)
          const returnedText = result.text
          returnedText.should.match(/.<!DOCTYPE html/)
          returnedText.should.match(/.cv/)
        })
    })
  })
})
