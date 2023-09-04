/**
 * @category Utility Class
 * @module Client
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to Firebase Client.
 */
export class FirebaseClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirebaseClientError';
  }
}
