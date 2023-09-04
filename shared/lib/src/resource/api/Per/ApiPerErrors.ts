/**
 * @category API
 * @module ApiPer
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to API Per.
 */
export class ApiPerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiPerError';
  }
}
