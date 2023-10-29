/**
 * @category Utility Class
 * @module Security
 */

/** Classes */
import { PubSub } from '../pubsub/PubSub';

/** Types */
import { GenericCallbackFunction } from '../../../data/types/CommonTypes';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../../data/interfaces/CommonInterfaces';
import { IUserInfoBody } from '../../../data/interfaces/UserInterfaces';

/** Enums */
import { SecurityEvents } from './SecurityEnums';

/**
 * Class that helps use auth token and subscribe to auth related events.
 */
class Security extends PubSub {
  EVENTS: typeof SecurityEvents;
  #user: IUserInfoBody | null;

  constructor() {
    super();

    this.EVENTS = SecurityEvents;
    this.#user = null;
  }

  /**
   * Method responsible for retrieve a stored auth user, in the case witch there
   * is no user stored, will publish a NO_AUTH_USER_STORED event.
   *
   * @returns The stored user if there is any or null otherwise.
   *
   * @fires SecurityEvents.NO_AUTH_USER_STORED
   */
  get user(): IUserInfoBody | null {
    const authUser = this.#user;

    if (authUser) return authUser;

    this.publish(SecurityEvents.NO_AUTH_USER_STORED, authUser);
    return null;
  }

  /**
   * Method responsible for storing a new user and publishing a NEW_USER_AUTH
   * event.
   *
   * @param token - Token to be stored
   *
   * @fires SecurityEvents.NEW_USER_AUTH
   */
  set user(user: IUserInfoBody) {
    this.#user = user;
    this.publish(SecurityEvents.NEW_USER_AUTH, this.#user);
  }

  /**
   * Method responsible for removing a auth user and publishing a EXCLUDE_AUTH_USER
   * event.
   *
   * @fires SecurityEvents.EXCLUDE_AUTH_USER
   */
  public excludeAuthenticatedUser(): void {
    this.#user = null;
    this.publish(SecurityEvents.EXCLUDE_AUTH_USER, null);
  }

  /**
   * Method responsible for publishing a API_REQUEST_UNAUTHORIZED with a given
   * error payload.
   *
   * @param errorPayload - The error in the LibGeneralErrorPayload format.
   */
  public publishApiRequestUnauthorized(errorPayload: ILibGeneralErrorPayload) {
    this.publish(SecurityEvents.API_REQUEST_UNAUTHORIZED, errorPayload);
  }

  /**
   * Method responsible for subscribing a callback function to all security class
   * fail authentication events
   *
   * @param callback - The callback function to be executed in case of authentication
   * fail event dispatch.
   */
  public subscribeSecurityFailEvents(callback: GenericCallbackFunction) {
    this.subscribe(SecurityEvents.API_REQUEST_UNAUTHORIZED, callback);
    this.subscribe(SecurityEvents.NO_AUTH_USER_STORED, callback);
  }

  /**
   * Method responsible for unsubscribing a callback function to all security class
   * fail authentication events
   *
   * @param callback - The subscribe callback function to be unsubscribed.
   */
  public unsubscribeSecurityFailEvents(callback: GenericCallbackFunction) {
    this.unsubscribe(SecurityEvents.API_REQUEST_UNAUTHORIZED, callback);
    this.unsubscribe(SecurityEvents.NO_AUTH_USER_STORED, callback);
  }
}

/** Singleton for Security class */
const security = new Security();

export { Security as SecurityClass, security as Security };
