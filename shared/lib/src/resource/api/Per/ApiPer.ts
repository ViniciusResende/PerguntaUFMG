/**
 * @category API
 * @module ApiPer
 */

/** Errors */
import { ApiPerError } from './ApiPerErrors';

/** Interfaces */
import { IApiPerAuthResponse } from './ApiPerInterfaces';
import { IFirebaseClientConfig } from '../../../utils/classes/firebase-client/FirebaseClientInterfaces';

/** Utilities */
import doesObjectHaveValue from '../../../utils/helpers/doesObjectHaveValue';
import { FirebaseClient } from '../../../utils/classes/firebase-client/FirebaseClient';

/**
 * PerguntaUFMG's API class.
 */
export class ApiPer {
  #apiClient: FirebaseClient;

  constructor(apiConfiguration: unknown) {
    if (!doesObjectHaveValue(apiConfiguration)) {
      throw new ApiPerError('No API configuration object found.');
    }

    this.#apiClient = new FirebaseClient(
      apiConfiguration as IFirebaseClientConfig
    );
  }

  /**
   * Fetches the Client API and retrieves a user data payload.
   *
   * @returns - The authenticated user data.
   */
  async authenticate(): Promise<IApiPerAuthResponse | undefined> {
    const authenticatedUser = await this.#apiClient.authenticate();

    if (!authenticatedUser) return undefined;

    return {
      id: authenticatedUser.uid,
      name: authenticatedUser.displayName,
      profile: authenticatedUser.photoURL,
    };
  }

  /**
   * Signs out the user from the Client API.
   */
  async signOut(): Promise<void> {
    await this.#apiClient.signOut();
  }
}
