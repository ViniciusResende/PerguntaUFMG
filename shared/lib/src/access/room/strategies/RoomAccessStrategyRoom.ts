/**
 * @category Access
 * @module RoomAccess
 */

/** Interfaces */
import {
  ICreateRoomData,
  IRoom,
} from '../../../data/interfaces/RoomInterfaces';

/** Classes */
import { RoomAccessStrategy } from './RoomAccessStrategy';

/**
 * Class that specifies Room Action access strategy
 */
export class RoomAccessStrategyRoom extends RoomAccessStrategy {
  /**
   * Creates a new room using the API.
   * @param data - Data used to create a new Room
   * @returns The id of the new room created.
   */
  public async create(data: ICreateRoomData): Promise<string | undefined> {
    return await this.api?.createRoom(data);
  }

  /**
   * Ends a room using the API.
   * @param roomCode - The room code to be deleted
   */
  public async delete(roomCode: string): Promise<void> {
    await this.api?.updateRoom(roomCode, {
      endedAt: new Date().toISOString(),
    });
  }

  /**
   * Fetches a room using the API.
   * @param roomCode - The room code to be fetched
   * @param requesterId  - The id requester of the data requested
   * @returns The room data
   */
  public async fetch(
    roomCode: string,
    requesterId?: string
  ): Promise<IRoom | undefined> {
    return await this.api?.fetchRoom(roomCode, requesterId);
  }

  /**
   * Subscribes to changes in a room using the API.
   * @param callback - The callback function to be called when a change occurs
   * @param roomCode - The room code to be fetched
   * @param requesterId - The id requester of the subscription
   */
  public subscribeToChanges(
    callback: (data: IRoom) => void,
    roomCode: string,
    requesterId: string
  ): void {
    this.api?.onRoomChange(roomCode, requesterId, callback);
  }

  /**
   * Updates a room using the API.
   * @param data - The data to be updated
   * @param roomCode  - The room code to be updated
   */
  public async update(
    data: Partial<ICreateRoomData>,
    roomCode: string
  ): Promise<void> {
    await this.api?.updateRoom(roomCode, data);
  }
}
