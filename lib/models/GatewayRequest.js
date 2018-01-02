class GatewayRequest {
  constructor (event) {
    this.event = event

    this.token = undefined
    this.decodedToken = undefined
    this.apiDocs = undefined
    this.path = undefined
    this.method = undefined
    this.scopes = undefined
    this.requiredScopeSets = undefined
  }

  setToken (token) {
    this.token = token
  }

  setDecodedToken (decodedToken) {
    this.decodedToken = decodedToken
  }

  setApiDocs (apiDocs) {
    this.apiDocs = apiDocs
  }

  getResource () {
    let methodArn = this.event['methodArn'].split(':')
    let apiGatewayArn = methodArn[5].split('/')

    return methodArn[0] + ':' + methodArn[1] + ':' + methodArn[2] + ':' + methodArn[3] + ':' + methodArn[4] + ':' + apiGatewayArn[0] + '/*'
  }

  getPath () {
    if (this.path !== undefined) return this.path

    this.path = this.event['requestContext']['resourcePath'].substr(4)

    return this.path
  }

  getMethod () {
    if (this.method !== undefined) return this.method

    this.method = this.event['requestContext']['httpMethod'].toLowerCase()

    return this.method
  }

  getScopes () {
    if (this.scopes !== undefined) return this.scopes

    try {
      this.scopes = this.decodedToken['scope'].split(' ')

      return this.scopes
    } catch (error) {
      this.scopes = []

      return this.scopes
    }
  }

  getRequiredScopeSets () {
    if (this.requiredScopeSets !== undefined) return this.requiredScopeSets

    try {
      this.requiredScopeSets = this.apiDocs['paths'][this.getPath()][this.getMethod()]['security'][0]['api_auth'].map((requiredScopes) => {
        return requiredScopes.split(' ')
      })

      return this.requiredScopeSets
    } catch (error) {
      this.requiredScopeSets = []

      return this.requiredScopeSets
    }
  }

  generatePrincipalId () {
    return JSON.stringify({
      token: this.token,
      identity: this.decodedToken
    })
  }
}

module.exports = GatewayRequest
