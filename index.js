const GatewayRequest = require('./lib/models/GatewayRequest')
const Logger = require('./lib/helpers/Logger')

const TokenHelper = require('./lib/helpers/TokenHelper')
const Validator = require('./lib/helpers/Validator')
const DocsRetriever = require('./lib/helpers/DocsRetriever')
const PolicyGenerator = require('./lib/helpers/PolicyGenerator')

/**
 * @param {Object} event
 * @param {Object} context
 * @param callback
 */
exports.handler = function jwtHandler (event, context, callback) {
  let gatewayRequest = new GatewayRequest(event)

  TokenHelper.setToken(gatewayRequest)
    .then(gatewayRequest => TokenHelper.setDecodedToken(gatewayRequest))
    .then(gatewayRequest => Validator.validateIssuer(gatewayRequest))
    .then(gatewayRequest => DocsRetriever.setApiDocs(gatewayRequest))
    .then(gatewayRequest => Validator.validateScopes(gatewayRequest))
    .then(gatewayRequest => {
      return callback(null, PolicyGenerator.generateSuccessResponse(gatewayRequest))
    })
    .catch(error => {
      Logger.error(error.toString(), error)

      return callback(new Error(`Unauthorized`))
    })
}
