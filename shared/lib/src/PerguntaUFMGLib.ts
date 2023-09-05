/**
 * Library that provides access to utilities and business rules' managers
 * required for building user interfaces for Pergunta UFMG.
 * @packageDocumentation
 * @category Library
 * @module PerguntaUFMGLib
 */

/** Managers */
import { AuthManager } from './manager/auth/AuthManager';

/** Utilities */
import { Utilities, UtilitiesClass } from './utils/Utilities';

/**
 * Class that provides access to utilities and business rules' managers for
 * dealing with rooms and authorization.
 */
export class PerguntaUFMGLib {
  auth: AuthManager;
  room: any;
  utils: UtilitiesClass;

  constructor() {
    this.auth = new AuthManager();
    this.room = {};
    this.utils = Utilities;
  }
}
