const path = require('path')

module.exports = {
  environment: process.env['NODE_ENV'],
  debugToken: process.env['DEBUG_TOKEN'],
  apiDocsUrl: process.env['APIDOCS_URL'],
  matchIssuer: process.env['MATCH_ISSUER'],
  requiredIssuer: process.env['REQUIRED_ISSUER'],
  publicKey: path.join(__dirname, '/cert.pem'),
  adminClientId: 'admin',
  cacheKeys: {
    docs: 'docs-cache'
  },
  cacheDefaultTtl: 600
}
