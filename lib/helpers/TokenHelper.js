const Config = require('../config/Config')

const jwt = require('jsonwebtoken')
const fs = require('fs')

/**
 * @param {GatewayRequest} request
 * @return {Promise}
 */
function setToken (request) {
  return new Promise((resolve, reject) => {
    if (Config.environment === 'local' && Config.debugToken) {
      request.event.headers['Authorization'] = `Bearer ${Config.debugToken}`
    }

    if (!request.event.headers['Authorization']) {
      return reject(new Error(`Authorization header was not found in request`))
    }

    let [tokenType, token] = request.event.headers['Authorization'].split(' ')

    if (tokenType !== 'Bearer') {
      return reject(new Error(`Unauthorized: Invalid token type in Authorization header (no Bearer)`))
    }

    request.setToken(token)

    return resolve(request)
  })
}

/**
 * @param {GatewayRequest} request
 * @return {Promise}
 */
function setDecodedToken (request) {
  return new Promise((resolve, reject) => {
    jwt.verify(request.token, fs.readFileSync(Config.publicKey), function (err, data) {
      if (err) {
        return reject(err)
      }

      request.setDecodedToken(data)

      return resolve(request)
    })
  })
}

module.exports = { setToken, setDecodedToken }
