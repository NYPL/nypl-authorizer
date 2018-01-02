const Config = require('../config/Config')
const Logger = require('./Logger')

/**
 * @param {GatewayRequest} request
 * @return {Promise}
 */
function validateIssuer (request) {
  return new Promise((resolve, reject) => {
    if (Config.matchIssuer !== 'true') {
      return resolve(request)
    }

    let requiredIssuer = Config.requiredIssuer
    let issuer = request.decodedToken['iss']

    if (!issuer) return reject(new Error(`No issuer found in token`))
    if (!requiredIssuer) return reject(new Error(`No required issuer was specified`))

    if (issuer === requiredIssuer) {
      return resolve(request)
    }

    reject(new Error(`Required issuer (${requiredIssuer}) does not match issuer (${issuer})`))
  })
}

/**
 * @param {GatewayRequest} request
 * @return {Promise}
 */
function validateScopes (request) {
  return new Promise((resolve, reject) => {
    if (!request.getRequiredScopeSets().length) {
      return resolve(request)
    }

    if (!request.getScopes().length) {
      return reject(new Error(`No scopes found in token`))
    }

    if (request.getScopes().indexOf(Config.adminClientId) !== -1) {
      return resolve(request)
    }

    request.getRequiredScopeSets().forEach(requiredScopeSet => {
      Logger.info(`Requiring scopes (${requiredScopeSet}) for route (${request.getMethod().toUpperCase()} ${request.getPath()})`)

      let scopeSetValid = requiredScopeSet.every(requiredScope => {
        return request.getScopes().indexOf(requiredScope) !== -1
      })

      if (!scopeSetValid) return reject(new Error(`Required scope set (${requiredScopeSet}) was not found in token scope (${request.getScopes()})`))

      return resolve(request)
    })
  })
}

module.exports = { validateIssuer, validateScopes }
