/**
 * @category Access
 * @module RoomAccess
 */

/** Enums */
import { RoomActionTypeEnum } from '../../data/enums/RoomEnums';

/** Errors */
import { MissingRoomActionTypeStrategyError } from './RoomAccessErrors';

/** Classes */
import { RoomAccessStrategy } from './strategies/RoomAccessStrategy';

/** Mappings */
import { roomActionTypeStrategyMap } from './RoomAccessMappings';

/**
 * Class to provide access to exchanges' data.
 */
export class RoomAccess {
  /**
   * Returns the access strategy class for the provided Room Action type.
   *
   * @param roomActionType - Type of the Room Action Method to get strategy for (e.g room)
   * @returns The strategy class instance to be used
   */
  private getStrategy(roomActionType: RoomActionTypeEnum): RoomAccessStrategy {
    const strategy = roomActionTypeStrategyMap.get(roomActionType);
    if (!strategy) {
      throw new MissingRoomActionTypeStrategyError(roomActionType);
    }
    return strategy;
  }

  /**
   * Executes the API call to create a new element.
   * @param roomActionType - Type of the Room Action Method to get strategy for (e.g room)
   * @param data - Data used to create element
   * @param ids - List of ids parameters to find element.
   * @returns The id of the new element created or undefined.
   */
  public async create(
    roomActionType: RoomActionTypeEnum,
    data: unknown,
    ...ids: string[]
  ): Promise<string | undefined> {
    const strategy = this.getStrategy(roomActionType);
    return await strategy.create(data, ...ids);
  }

  /**
   * Deletes an element from the API.
   * @param roomActionType - Type of the Room Action Method to get strategy for (e.g room)
   * @param ids - List of ids parameters to find element.
   */
  public async delete(roomActionType: RoomActionTypeEnum, ...ids: string[]) {
    const strategy = this.getStrategy(roomActionType);
    await strategy.delete(...ids);
  }

  /**
   * Fetches the API to get an element data.
   * @param roomActionType - Type of the Room Action Method to get strategy for (e.g room)
   * @param ids - List of ids parameters to find element.
   * @returns The element data.
   */
  public async fetch(
    roomActionType: RoomActionTypeEnum,
    ...ids: string[]
  ): Promise<unknown> {
    const strategy = this.getStrategy(roomActionType);
    const result = await strategy.fetch(...ids);

    return result;
  }

  /**
   * Subscribes a callback to the changes on the element.
   * @param roomActionType - Type of the Room Action Method to get strategy for (e.g room)
   * @param callback - Callback function to be called when changes are detected
   * @param ids - List of ids parameters to find element.
   */
  public subscribeToChanges(
    roomActionType: RoomActionTypeEnum,
    callback: (data: unknown) => void,
    ...ids: string[]
  ) {
    const strategy = this.getStrategy(roomActionType);
    strategy.subscribeToChanges(callback, ...ids);
  }

  /**
   * Updates an element from the API.
   * @param roomActionType - Type of the Room Action Method to get strategy for (e.g room)
   * @param data - Data used to update element
   * @param ids - List of ids parameters to find element.
   */
  public async update(
    roomActionType: RoomActionTypeEnum,
    data: unknown,
    ...ids: string[]
  ) {
    const strategy = this.getStrategy(roomActionType);
    await strategy.update(data, ...ids);
  }
}
