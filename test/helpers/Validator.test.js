/* eslint-disable semi */
const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect

const Errors = require('../../lib/config/Errors')
const MockEvent = require('../mock_event.json')
const GatewayRequest = require('../../lib/models/GatewayRequest')

chai.should()
chai.use(chaiAsPromised)

describe('validateIssuer', () => {
  it('should return resolved Promise is matchIssuer is not true', () => {
    let Validator = require('../../lib/helpers/Validator')

    let request = new GatewayRequest(MockEvent)

    let Config = {
      matchIssuer: `false`
    }

    let result = Validator.validateIssuer(request, Config)

    return result.should.be.fulfilled
  })

  it('should return resolved Promise is matchIssuer is not true', () => {
    let Validator = require('../../lib/helpers/Validator')

    let request = new GatewayRequest(MockEvent)

    let Config = {
      matchIssuer: `true`
    }

    let result = Validator.validateIssuer(request, Config)

    return result.should.be.rejectedWith(Errors.RequiredIssuerValidatorError)
  })

  it('should return resolved Promise is matchIssuer is not true', () => {
    let Validator = require('../../lib/helpers/Validator')

    let request = new GatewayRequest(MockEvent)

    let Config = {
      matchIssuer: `true`,
      requiredIssuer: `isso.nypl.org`
    }

    let result = Validator.validateIssuer(request, Config)

    return result.should.be.rejectedWith(Errors.NoIssuerValidatorError)
  })
})
