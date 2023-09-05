/**
 * @category Manager
 * @module AuthManager
 */

/** Accesses */
import { AuthAccess } from '../../access/auth/AuthAccess';

/** Errors */
import {
  AuthManagerError,
  AuthenticationFailedError,
} from './AuthManagerErrors';

/** Interfaces */
import { IUserInfoBody } from '../../data/interfaces/UserInterfaces';

/** Utilities */
import doesObjectHaveValue from '../../utils/helpers/doesObjectHaveValue';
import { Utilities } from '../../utils/Utilities';

/**
 * Class to handle business logic related to the authentication at any level
 * of the application
 */
export class AuthManager extends Utilities.pubSub {
  #authAccess: AuthAccess;
  #authenticatedUser: IUserInfoBody | null;

  constructor() {
    super();
    this.#authAccess = new AuthAccess();
    this.#authenticatedUser = null;
  }

  /**
   * Authenticates the user, stores it's data and returns the user payload.
   *
   * @returns The authenticated user payload data.
   * @fires Utilities.notification
   */
  async auth(): Promise<IUserInfoBody | null> {
    try {
      const authenticatedUser = await this.#authAccess.auth();

      if (!doesObjectHaveValue(authenticatedUser) || !authenticatedUser) {
        throw new AuthenticationFailedError(
          'Autenticação de usuário falhou. Tente novamente mais tarde.'
        );
      }

      this.#authenticatedUser = {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        profile: authenticatedUser.profile,
      };

      return this.#authenticatedUser;
    } catch (err: unknown) {
      const error = err as AuthManagerError;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Erro de autenticação', content: error.message }
      );
    }

    return null;
  }

  /**
   * Returns the authenticated user data if exists.
   *
   * @returns The authenticated user data or null if not authenticated.
   */
  get authenticatedUser(): IUserInfoBody | null {
    return this.#authenticatedUser;
  }

  /**
   * Signs out the user and delete it's stored data.
   */
  async signOut(): Promise<void> {
    await this.#authAccess.signOut();

    this.#authenticatedUser = null;
  }
}
