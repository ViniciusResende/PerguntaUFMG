/**
 * @category Manager
 * @module RoomManager
 */

/** Accesses */
import { RoomEngine } from '../../engine/room/RoomEngine';

/** Enums */
import { RoomEvents } from './RoomManagerEnums';

/** Interfaces */
import {
  ICreateQuestionData,
  ICreateRoomData,
  IRoom,
} from '../../data/interfaces/RoomInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/**
 * Class to handle business logic related to the room entity at any level
 * of the application
 */
export class RoomManager extends Utilities.pubSub {
  #roomEngine: RoomEngine;
  #roomMetadata: Partial<IRoom> | null;

  constructor() {
    super();
    this.#roomEngine = new RoomEngine();
    this.#roomMetadata = null;
  }

  /**
   * Adds the event listeners to the room.
   */
  private addEventListeners(): void {
    if (!this.#roomMetadata) return;

    this.#roomEngine.subscribeToRoomChanges(this.onRoomUpdate);
  }

  /**
   * After a room update publishes the event.
   * @param data - Updated data of the room
   *
   * @fires RoomManager#ROOM_DATA_CHANGED
   */
  private onRoomUpdate(data: IRoom): void {
    this.publish(RoomEvents.ROOM_DATA_CHANGED, data);
  }

  /**
   * Updates the room metadata.
   * @param data - Data used to update the metadata of the room
   */
  private updateRoomMetadata(data: IRoom): void {
    this.#roomMetadata = {
      authorId: data.authorId,
      id: data.id,
    };

    this.addEventListeners();
  }

  /**
   * Updates a question marking it as answered.
   * @param questionId - The question id to be checked as answered
   */
  public async checkQuestionAsAnswered(questionId: string): Promise<void> {
    try {
      this.#roomEngine.questionUpdate({ isAnswered: true }, questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while editing question:', content: error.message }
      );
    }
  }

  /**
   * Creates a new room and joins it, subscribing to room changes events.
   * @param data - Data used to create a new room
   * @returns The data of the new room created.
   */
  public async createRoom(data: ICreateRoomData): Promise<IRoom> {
    try {
      const newRoomId = await this.#roomEngine.createRoom(data);

      const roomData = this.joinRoom(newRoomId);

      return roomData;
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while creating room:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Deletes a question using it's question id.
   * @param questionId - The question id to be deleted
   */
  public async deleteQuestion(questionId: string): Promise<void> {
    try {
      await this.#roomEngine.deleteQuestion(questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while deleting question:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Dislikes a question like using it's question id and like id.
   * @param questionId - The question id to be disliked
   * @param likeId - The like id to be disliked
   */
  public async dislikeQuestion(
    questionId: string,
    likeId: string
  ): Promise<void> {
    try {
      await this.#roomEngine.dislikeQuestion(questionId, likeId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while disliking question:', content: error.message }
      );
    }
  }

  /**
   * Ends the active room.
   */
  public async endRoom(): Promise<void> {
    try {
      await this.#roomEngine.endRoom();
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while ending room:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Retrieves the room metadata.
   * @returns The room data
   */
  get roomMetadata(): Partial<IRoom> | null {
    return this.#roomMetadata;
  }

  /**
   * Highlights a question using it's question id.
   * @param questionId - The question id to be highlighted
   */
  public async highlightQuestion(questionId: string): Promise<void> {
    try {
      this.#roomEngine.questionUpdate({ isHighlighted: true }, questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while editing question:', content: error.message }
      );
    }
  }

  /**
   * Retrieves the room data after fetching it, subscribing to room changes events.
   * @param roomCode - The room code to be joined
   * @returns The room data
   */
  public async joinRoom(roomCode: string): Promise<IRoom> {
    try {
      const roomData = await this.#roomEngine.fetchRoom(roomCode);

      this.updateRoomMetadata(roomData);

      return roomData;
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while joining room:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Adds a new like to a give question id
   * @param questionId - The question id to be liked.
   */
  public async likeQuestion(questionId: string): Promise<void> {
    try {
      await this.#roomEngine.likeQuestion(questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while liking question:', content: error.message }
      );
    }
  }

  /**
   * Sends a new question to the room.
   * @param data - Data used to create a new question
   */
  public async sendQuestion(data: ICreateQuestionData): Promise<void> {
    try {
      await this.#roomEngine.createQuestion(data);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        {
          title: 'Error while sending question:',
          content: error.message,
        }
      );
    }
  }
}
