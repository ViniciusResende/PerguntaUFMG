/**
 * @category Access
 * @module RoomAccess
 */

/** Classes */
import { ApiPer } from '../../../resource/api/Per/ApiPer';

/** Utilities */
import { Utilities } from '../../../utils/Utilities';
import doesObjectHaveValue from '../../../utils/helpers/doesObjectHaveValue';

/**
 * Class that enables the creation of custom Room access strategies for various
 * Room Action types.
 */
export abstract class RoomAccessStrategy {
  #apiPer: ApiPer | null;

  constructor() {
    this.#apiPer = this.getApiPerInstance();
    this.addEventListeners();
  }

  /**
   * Adds the event listener for configuration changes.
   */
  private addEventListeners() {
    const onConfigurationChanged = this.onConfigurationChanged.bind(this);
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
  private getApiPerInstance(): ApiPer | null {
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
  private onConfigurationChanged() {
    this.#apiPer = this.getApiPerInstance();
  }

  /**
   * Creates a new element in the API.
   * @param data - Data used to create element
   * @param ids - List of ids parameters to find element.
   * @returns The id of the new element created.
   */
  public abstract create(
    data: unknown,
    ...ids: string[]
  ): Promise<string | undefined>;

  /**
   * Deletes an element from the API.
   * @param ids - List of ids parameters to find element.
   */
  public abstract delete(...ids: string[]): Promise<void>;

  /**
   * Fetches an element from the API.
   * @param ids - List of ids parameters to find element.
   */
  public abstract fetch(...ids: string[]): Promise<unknown>;

  /**
   * Subscribes a callback to the changes on the element.
   * @param callback - Callback function to be executed when data changes.
   * @param ids - List of ids parameters to find element.
   */
  public abstract subscribeToChanges(
    callback: (data: unknown) => void,
    ...ids: string[]
  ): void;

  /**
   * Updates an element from the API.
   * @param data - Data used to update element
   * @param ids - List of ids parameters to find element.
   */
  public abstract update(data: unknown, ...ids: string[]): Promise<void>;

  /**
   * Getter for the API to being used.
   *
   * @returns The API class instance
   */
  get api(): ApiPer | null {
    return this.#apiPer;
  }
}
