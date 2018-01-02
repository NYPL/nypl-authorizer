/* eslint-disable semi */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const MockEvent = require('../mock_event.json')
const GatewayRequest = require('../../lib/models/GatewayRequest')

chai.should()
chai.use(chaiAsPromised)

describe('GatewayRequest', () => {
  it('should return a proper resource', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.getResource().should.equal(`arn:aws:execute-api:us-east-1:224280085904:1fg5jou30a/*`)
  })

  it('should return a proper path', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.getPath()

    request.getPath().should.equal(`/v0.1/bibs/{nyplSource}/{id}`)
  })

  it('should return a proper method', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.getMethod()

    request.getMethod().should.equal(`get`)
  })

  it('should return proper scopes if they exist', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    let scopes = `scope1 scope2`;

    request.setDecodedToken({
      'scope': scopes
    })

    request.getScopes().should.deep.equal(scopes.split(' '))
  })

  it('should return a blank array of scopes if none exist', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.setDecodedToken({})

    request.getScopes().should.deep.equal([])
  })

  it('should return a blank array of scopes if none exist', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.setDecodedToken({})

    request.getScopes().should.deep.equal([])
  })

  it('should return an array of required scopes', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.setApiDocs(require('./../mock_docs.json'))

    request.getRequiredScopeSets().should.deep.equal([[ 'openid', 'read:bib' ]])
  })

  it('should return an JSON principal ID', () => {
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    let request = new GatewayRequest(MockEvent)

    request.generatePrincipalId().should.be.a('string')
  })
})
