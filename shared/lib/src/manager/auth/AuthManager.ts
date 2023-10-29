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

  constructor() {
    super();
    this.#authAccess = new AuthAccess();
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

      Utilities.security.user = {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        profile: authenticatedUser.profile,
      };

      return authenticatedUser;
    } catch (err: unknown) {
      const error = err as AuthManagerError;

      Utilities.logging.error(error.message, error.stack);

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
    return Utilities.security.user;
  }

  /**
   * Signs out the user and delete it's stored data.
   */
  async signOut(): Promise<void> {
    await this.#authAccess.signOut();

    Utilities.security.excludeAuthenticatedUser();
  }
}
