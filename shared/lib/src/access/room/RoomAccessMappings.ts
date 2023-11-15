/**
 * @category Access
 * @module RoomAccess
 */

/** Enums */
import { RoomActionTypeEnum } from '../../data/enums/RoomEnums';

/** Classes */
import { RoomAccessStrategy } from './strategies/RoomAccessStrategy';
import { RoomAccessStrategyLike } from './strategies/RoomAccessStrategyLike';
import { RoomAccessStrategyQuestion } from './strategies/RoomAccessStrategyQuestion';
import { RoomAccessStrategyRoom } from './strategies/RoomAccessStrategyRoom';

/**
 * Mapping between Room Action type and access strategy class.
 *
 */
export const roomActionTypeStrategyMap = new Map<
  RoomActionTypeEnum,
  RoomAccessStrategy
>([
  [RoomActionTypeEnum.LIKE, new RoomAccessStrategyLike()],
  [RoomActionTypeEnum.QUESTION, new RoomAccessStrategyQuestion()],
  [RoomActionTypeEnum.ROOM, new RoomAccessStrategyRoom()],
]);
