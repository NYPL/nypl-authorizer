// /* eslint-disable semi */
// const chai = require('chai')
// const sinon = require('sinon')
// const chaiAsPromised = require('chai-as-promised')
// const expect = chai.expect
//
// const Errors = require('../../lib/config/Errors')
// const GatewayRequest = require('../../lib/models/GatewayRequest')
//
// chai.should()
// chai.use(chaiAsPromised)
//
// describe('DocsRetriever tests', () => {
//   it('setApiDocs should return an error if no request is specified', () => {
//     let DocsRetriever = require('../../lib/helpers/DocsRetriever')
//
//     let result = DocsRetriever.setApiDocs()
//
//     return result.should.be.rejectedWith(Errors.MissingParameter)
//   })
//   //
//   // it('setApiDocs should used cached API docs if they are in the cache', () => {
//   //   let DocsRetriever = require('../../lib/helpers/DocsRetriever')
//   //
//   //   let result = DocsRetriever.setApiDocs(new GatewayRequest({}))
//   //
//   //   return result.to.eventually.have.property('apiDocs')
//   // })
// })
