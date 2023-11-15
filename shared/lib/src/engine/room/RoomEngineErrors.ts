/**
 * @category Engine
 * @module RoomEngine
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to Room engine.
 */
export class RoomEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoomEngineError';
  }
}
