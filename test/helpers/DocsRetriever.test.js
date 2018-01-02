/* eslint-disable semi */
const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect

const Errors = require('../../lib/config/Errors')

chai.should()
chai.use(chaiAsPromised)

describe('DocsRetriever tests', () => {
  it('setApiDocs should return an error if no request is specified', () => {
    let DocsRetriever = require('../../lib/helpers/DocsRetriever')

    let result = DocsRetriever.setApiDocs()

    return result.should.be.rejectedWith(Errors.MissingParameter);
  })

  it('setApiDocs should return an error if no request is specified', () => {
    let DocsRetriever = require('../../lib/helpers/DocsRetriever')
    let GatewayRequest = require('../../lib/models/GatewayRequest')

    sinon.stub(DocsRetriever, 'Config').callsFake({
    })

    const result = DocsRetriever.setApiDocs(GatewayRequest)

    return result.should.be.rejectedWith(Error, "test");
  })
})
