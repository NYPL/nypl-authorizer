class MissingParameter extends Error {}

class InvalidAuthorizationTokenError extends Error {}
class BlankAuthorizationTokenError extends Error {}
class InvalidTypeTokenError extends Error {}

class BlankTokenError extends Error {}
class InvalidKeyTokenError extends Error {}

class RequiredIssuerValidatorError extends Error {}
class NoIssuerValidatorError extends Error {}
class InvalidIssuerValidatorError extends Error {}

module.exports = {
  MissingParameter,
  InvalidAuthorizationTokenError,
  BlankAuthorizationTokenError,
  InvalidTypeTokenError,
  BlankTokenError,
  InvalidKeyTokenError,
  RequiredIssuerValidatorError,
  NoIssuerValidatorError,
  InvalidIssuerValidatorError
}
