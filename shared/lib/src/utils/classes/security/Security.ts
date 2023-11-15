/**
 * @category Utility Class
 * @module Security
 */

/** Classes */
import { PubSub } from '../pubsub/PubSub';
import { LocalStorage } from '../local-storage/LocalStorage';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../../data/interfaces/CommonInterfaces';
import { IUserInfoBody } from '../../../data/interfaces/UserInterfaces';

/** Enums */
import { LocalStorageKeysEnum } from '../local-storage/LocalStorageEnums';
import { SecurityEvents } from './SecurityEnums';

/**
 * Class that helps use auth token and subscribe to auth related events.
 */
class Security extends PubSub {
  EVENTS: typeof SecurityEvents;
  #localStorage: LocalStorage;

  constructor() {
    super();

    this.EVENTS = SecurityEvents;
    this.#localStorage = new LocalStorage();
  }

  private getPersistedUser(): IUserInfoBody | null {
    const stringifiedUser = this.#localStorage.getLocalStorageItem(
      LocalStorageKeysEnum.USER_DATA
    );

    if (!stringifiedUser) return null;

    return JSON.parse(stringifiedUser) as IUserInfoBody;
  }

  /**
   * Private method responsible for storing user data in the local storage.
   *
   * @param user - User data to be stored
   */
  private persistUser(user: IUserInfoBody) {
    this.#localStorage.setLocalStorageItem(
      LocalStorageKeysEnum.USER_DATA,
      JSON.stringify(user)
    );
  }

  /**
   * Private method responsible for removing the stored user data in the local
   * storage.
   *
   */
  private removeUser() {
    this.#localStorage.removeLocalStorageItem(LocalStorageKeysEnum.USER_DATA);
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
    const authUser = this.getPersistedUser();

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
    this.persistUser(user);
    this.publish(SecurityEvents.NEW_USER_AUTH, user);
  }

  /**
   * Method responsible for removing a auth user and publishing a EXCLUDE_AUTH_USER
   * event.
   *
   * @fires SecurityEvents.EXCLUDE_AUTH_USER
   */
  public excludeAuthenticatedUser(): void {
    this.removeUser();
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
}

/** Singleton for Security class */
const security = new Security();

export { Security as SecurityClass, security as Security };
