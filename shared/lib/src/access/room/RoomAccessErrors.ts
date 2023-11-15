/**
 * @category Access
 * @module RoomAccess
 */

/** Enums */
import { RoomActionTypeEnum } from '../../data/enums/RoomEnums';

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to Room access.
 */
export class RoomAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoomAccessError';
  }
}

/**
 * Class which extends the base RoomAccessError and represents an error that is
 * thrown when no mapping strategy was found for the given Auth type.
 */
export class MissingRoomActionTypeStrategyError extends RoomAccessError {
  constructor(authType: RoomActionTypeEnum) {
    super(`No mapping strategy found for Auth of type: '${authType}'`);
    this.name = 'MissingRoomTypeStrategyError';
  }
}
