/**
 * @category Access
 * @module AuthAccess
 */

/** Classes */
import { ApiPer } from '../../resource/api/Per/ApiPer';

/** Interfaces */
import { IApiPerAuthResponse } from '../../resource/api/Per/ApiPerInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';
import doesObjectHaveValue from '../../utils/helpers/doesObjectHaveValue';

/**
 * Class to provide access to exchanges' data.
 */
export class AuthAccess {
  #apiPer: ApiPer | null;

  constructor() {
    this.#apiPer = this.#getApiPerInstance();
    this.#addEventListeners();
  }

  /**
   * Adds the event listener for configuration changes.
   */
  #addEventListeners() {
    const onConfigurationChanged = this.#onConfigurationChanged.bind(this);
    Utilities.subscribe(
      Utilities.EVENTS.CONFIGURATION_CHANGED,
      onConfigurationChanged
    );
  }

  /**
   * Returns a new ApiPer instance with the current configuration from Utilities.
   *
   * @returns The ApiPer instance with updated configuration
   */
  #getApiPerInstance(): ApiPer | null {
    const { apiConfigObject } = Utilities.configuration;
    const apiPer = doesObjectHaveValue(apiConfigObject)
      ? new ApiPer(apiConfigObject)
      : null;
    return apiPer;
  }

  /**
   * Event handler to deal with configuration changes.
   * It will update the access' ApiPer instance with the new configuration.
   */
  #onConfigurationChanged() {
    this.#apiPer = this.#getApiPerInstance();
  }

  /**
   * Retrieves an Auth Response Payload after authenticating user.
   *
   * @returns The payload containing the Auth Response
   */
  async auth(): Promise<IApiPerAuthResponse | undefined> {
    const authResponseBody = await this.#apiPer?.authenticate();

    return authResponseBody;
  }

  /**
   * Signs out the user from the API.
   */
  async signOut(): Promise<void> {
    await this.#apiPer?.signOut();
  }
}
