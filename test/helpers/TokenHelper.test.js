/* eslint-disable semi */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const Errors = require('../../lib/config/Errors')
const MockEvent = require('../mock_event.json')
const GatewayRequest = require('../../lib/models/GatewayRequest')

chai.should()
chai.use(chaiAsPromised)

describe('TokenHelper', () => {
  describe('setToken', () => {
    it('should should set token if a debug token is specified and the environment is local', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let debugToken = 'debug_token'

      let request = new GatewayRequest(MockEvent)

      let Config = {
        environment: `local`,
        debugToken: debugToken
      }

      let result = TokenHelper.setToken(request, Config)

      return result.should.eventually.have.property('token').equal(debugToken)
    })

    it('should should not use debug token if the environment is not local', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let debugToken = 'debug_token'

      let request = new GatewayRequest(MockEvent)

      request.event['headers']['Authorization'] = `Bearer other_token`

      let Config = {
        environment: `development`,
        debugToken: debugToken
      }

      let result = TokenHelper.setToken(request, Config)

      return result.should.eventually.have.property('token').not.equal(debugToken)
    })

    it('should return a rejected Promise with an error if not Authorization header is invalid', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let request = new GatewayRequest(MockEvent)
      let Config = {}

      request.event = {}

      let result = TokenHelper.setToken(request, Config)

      return result.should.be.rejectedWith(Errors.InvalidAuthorizationTokenError)
    })

    it('should return a rejected Promise with an error if not Authorization header is blank', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let request = new GatewayRequest(MockEvent)
      let Config = {}

      request.event['headers']['Authorization'] = ``

      let result = TokenHelper.setToken(request, Config)

      return result.should.be.rejectedWith(Errors.BlankAuthorizationTokenError)
    })

    it('should return a rejected Promise with an error if wrong token type is specified', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let request = new GatewayRequest(MockEvent)
      let Config = {}

      request.event['headers']['Authorization'] = `WrongType 123123`

      let result = TokenHelper.setToken(request, Config)

      return result.should.be.rejectedWith(Errors.InvalidTypeTokenError)
    })

    it('should set token', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let request = new GatewayRequest(MockEvent)
      let Config = {}

      request.event['headers']['Authorization'] = `Bearer 123123`

      let result = TokenHelper.setToken(request, Config)

      return result.should.eventually.have.property('token')
    })
  })

  describe('setDecodedToken', () => {
    it('should return a rejected Promise on an error', () => {
      let TokenHelper = require('../../lib/helpers/TokenHelper')

      let request = new GatewayRequest(MockEvent)
      let Config = {}

      let result = TokenHelper.setDecodedToken(request, Config)

      return result.should.be.rejected
    })
  })
})
