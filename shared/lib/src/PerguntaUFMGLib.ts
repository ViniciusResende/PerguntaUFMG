/**
 * Library that provides access to utilities and business rules' managers
 * required for building user interfaces for Pergunta UFMG.
 * @packageDocumentation
 * @category Library
 * @module PerguntaUFMGLib
 */

/** Managers */

/** Utilities */

/**
 * Class that provides access to utilities and business rules' managers for
 * dealing with rooms and authorization.
 */
export class PerguntaUFMGLib {
  auth: any;
  room: any;
  utils: any;

  constructor() {
    this.auth = {};
    this.room = {};
    this.utils = {};
  }
}
