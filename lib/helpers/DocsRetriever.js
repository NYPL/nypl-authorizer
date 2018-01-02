const Config = require('../config/Config')
const Errors = require('../config/Errors')
const Logger = require('./Logger')

const axios = require('axios')
const cache = new NodeCache({stdTTL: Config.cacheDefaultTtl, checkperiod: 0})

/**
 * @param {GatewayRequest} request
 * @param {} Config
 * @return {Promise}
 */
function setApiDocs (request, Config) {
  return new Promise((resolve, reject) => {
    if (!request) return reject(new Errors.MissingParameter(`Request was not passed to function`))

    if (cache.get(Config.cacheKeys.docs) !== undefined) {
      Logger.info(`Using cached API documentation`)

      let cachedApiDocs = cache.get(Config.cacheKeys.docs)

      request.setApiDocs(cachedApiDocs)

      return resolve(request)
    }

    axios.get(Config.apiDocsUrl)
      .then(response => {
        Logger.info(`Retrieving API documentation from ${Config.apiDocsUrl}`)

        cache.set(Config.cacheKeys.docs, response['data'])

        request.setApiDocs(response['data'])

        return resolve(request)
      })
      .catch(error => {
        return reject(error)
      })
  })
}

module.exports = { setApiDocs }
