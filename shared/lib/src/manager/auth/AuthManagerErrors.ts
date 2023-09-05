/**
 * @category Manager
 * @module AuthManager
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to Auth manager.
 */
export class AuthManagerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthManagerError';
  }
}

/**
 * Class which extends the base AuthAccessError and represents an error that is
 * thrown when no user payload is returned from the authentication call.
 */
export class AuthenticationFailedError extends AuthManagerError {
  constructor(message: string) {
    super(message);
    this.name = 'AuthManagerError';
  }
}
